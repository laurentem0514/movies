const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, getAllMoviesWithRatings, updateMovie, deleteMovie } = require('../../models/movie');
const sendJSONresp = (req, res) => res.json(res.rows);

// handle all the routes
// router.get('/', (req, res) => {
//   res.render('index.html');
// });
// get all movies
router.route('/')
 .get(getAllMovies, sendJSONresp);
// Get movies withrating BONUS

// Get single movie

router.route('/:id')
  .get(getMovie, sendJSONresp)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;
