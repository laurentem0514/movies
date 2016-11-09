const db = require('../lib/dbConnect');

// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering

// default limit
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
// implement get all movies
    db.any(`SELECT * FROM movies
      LIMIT ` + limit + ` OFFSET ` + offset + `;`)
      .then((data) => {
        res.rows = data;
        next();
      })
      .catch(error => next(error));
}

function getMovie(req, res, next) {
// implement get single movie
  db.one(`
    SELECT *
    FROM movies
    WHERE id = $/id/; `
    , req.params)
    .then((data) => {
      res.rows = data;
      next();
    })
    .catch(error => next(error));

}

function updateMovie(req, res, next) {
// implement update
  db.none(`
    UPDATE movies
    SET title=$2,
        release_date=$3,
        video_release_date=$4,
        imdb_url=$5,
        gen_unknown=$6,
        gen_action=$7,
        gen_adventure=$8,
        gen_animation=$9,
        gen_children=$10,
        gen_comedy=$11,
        gen_crime=$12,
        gen_documentary=$13,
        gen_drama=$14,
        gen_fantasy=$15,
        gen_film_noir=$16,
        gen_horror=$17,
        gen_musical=$18,
        gen_mystery=$19,
        gen_romance=$20,
        gen_scifi=$21,
        gen_thriller=$22,
        gen_war=$23,
        gen_western=$24
        WHERE id=$1
        `,
        [Number.parseInt(req.params.id), req.body.title, req.body.release_date, req.body.video_release_date,
        req.body.imdb_url, req.body.gen_unknown, req.body.gen_action, req.body.gen_adventure,
        req.body.gen_animation, req.body.gen_children, req.body.gen_comedy, req.body.gen_crime,
        req.body.gen_documentary, req.body.gen_drama, req.body.gen_fantasy, req.body.gen_film_noir,
        req.body.gen_horror, req.body.gen_musical, req.body.gen_mystery, req.body.gen_romance,
        req.body.gen_scifi, req.body.gen_thriller, req.body.gen_war, req.body.gen_western])
    .then(() => {
      res.status(204)
    })
    .catch(error => next(error));

}

function deleteMovie(req, res, next) {
// implement delete
    movie = Number.parseInt(req.params.ID);
    db.none(`
      DELETE FROM movies
      WHERE id = $1;
      `, [movie])
    .then(function () {
      res.status(204)
      })
    .catch(function (err) {
      return next(err);
    });
}

// BONUS
function getAllMoviesWithRatings(req, res, next) {

}

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getAllMoviesWithRatings
};
