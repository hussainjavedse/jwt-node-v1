const express = require('express');
const router = express.Router();
const userMovieController = require('../app/api/controllers/userMovies');
const {query, body} = require('express-validator');

router.get('/', query('user_id').not().isEmpty(), query('movies').not().isEmpty(), userMovieController.getUserMovies);
router.post('/', body('user_id').not().isEmpty(), body('movies').not().isEmpty(), userMovieController.createUserMovies);

module.exports = router;