import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API Routes
// TODO: Implement the following endpoints:
// GET /api/movies - retrieve all movies from database  
app.get('/api/movies', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.connect();

  connection.query('SELECT * FROM movies', (error, results) => {
    if (error) {
      console.error('Error fetching movies:', error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });

  connection.end();
});


// POST /api/reviews - create a new movie review
app.post('/api/reviews', (req, res) => {
  const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;

  const connection = mysql.createConnection(config);
  connection.connect();

  const userCheckQuery = 'SELECT * FROM User WHERE userID = ?';
  connection.query(userCheckQuery, [userID], (userErr, userResults) => {
    if (userErr) {
      console.error('Error checking user:', userErr);
      res.status(500).send('Server error while checking user');
      connection.end();
      return;
    }

    if (userResults.length === 0) {
      console.warn('User not found for userID:', userID);
      res.status(400).send('User does not exist');
      connection.end();
      return;
    }

    const insertReviewQuery = `
      INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(insertReviewQuery, [reviewTitle, reviewContent, reviewScore, userID, movieID], (reviewErr, reviewResults) => {
      if (reviewErr) {
        console.error('Error inserting review:', reviewErr);
        res.status(500).send('Server error while inserting review');
      } else {
        console.log('Review inserted successfully');
        res.json({ message: 'Review inserted successfully' });
      }
      connection.end();
    });
  });
});



app.post('/api/search', (req, res) => {
  const { title, actor, director } = req.body;

  const connection = mysql.createConnection(config);
  connection.connect();

  const [actorFirst = '', actorLast = ''] = actor?.trim().split(/\s+(.+)/) || [];
  const [directorFirst = '', directorLast = ''] = director?.trim().split(/\s+(.+)/) || [];

  let baseQuery = `
    SELECT m.id, m.name AS movieTitle,
           GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS directors,
           AVG(r.reviewScore) AS avgRating,
           GROUP_CONCAT(DISTINCT r.reviewContent SEPARATOR '||') AS reviews
    FROM movies m
    LEFT JOIN movies_directors md ON m.id = md.movie_id
    LEFT JOIN directors d ON md.director_id = d.id
    LEFT JOIN roles ro ON m.id = ro.movie_id
    LEFT JOIN actors a ON ro.actor_id = a.id
    LEFT JOIN Review r ON m.id = r.movieID
  `;

  const conditions = [];
  const values = [];

  if (title) {
    conditions.push("m.name = ?");
    values.push(title.trim());
  }

  if (actor) {
    conditions.push("a.first_name = ? AND a.last_name = ?");
    values.push(actorFirst.trim(), actorLast.trim());
  }

  if (director) {
    baseQuery += `
      WHERE m.id IN (
        SELECT md2.movie_id
        FROM movies_directors md2
        JOIN directors d2 ON md2.director_id = d2.id
        WHERE d2.first_name = ? AND d2.last_name = ?
      )
    `;
    values.push(directorFirst.trim(), directorLast.trim());
  } else if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  baseQuery += " GROUP BY m.id";

  connection.query(baseQuery, values, (error, results) => {
    if (error) {
      console.error("Search query error:", error);
      res.status(500).send("Server error");
    } else {
      const formatted = results.map(row => ({
        title: row.movieTitle,
        directors: row.directors || "N/A",
        avgRating: row.avgRating ? Number(row.avgRating).toFixed(2) : "N/A",
        reviews: row.reviews ? row.reviews.split("||") : [],
      }));
      res.json(formatted);
    }
  });

  connection.end();
});



app.get('/api/trailers', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.connect();

  const sql = `
    SELECT m.id AS movieID, m.name AS title, t.comment, t.rating, u.email, t.created_at
    FROM TrailerReview t
    JOIN movies m ON t.movieID = m.id
    JOIN User u ON t.userID = u.userID
    ORDER BY t.created_at DESC
  `;


  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching trailer reviews:', error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });

  connection.end();
});


app.post('/api/trailers', (req, res) => {
  const { movieID, userID, comment, rating } = req.body;

  const connection = mysql.createConnection(config);
  connection.connect();

  const sql = `INSERT INTO TrailerReview (movieID, userID, comment, rating) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [movieID, userID, comment, rating], (error, results) => {
    if (error) {
      console.error('❌ Error inserting trailer review:', error);
      res.status(500).json({ error: 'Server error inserting trailer review', details: error.message });
    } else {
      console.log('✅ Trailer review inserted successfully');
      res.json({ message: 'Trailer review added successfully' });
    }

    connection.end();
  });
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
