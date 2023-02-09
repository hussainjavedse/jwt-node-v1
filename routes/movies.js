const express = require('express');
const router = express.Router();
const movieController = require('../app/api/controllers/movies');
const {query, body} = require('express-validator');

router.post('/', body('name').not().isEmpty(), body('type').not().isEmpty(), movieController.create);
router.put('/', body('name').not().isEmpty(), query('movie_id').not().isEmpty(), movieController.updateById);
router.delete('/', query('movie_id').not().isEmpty(), movieController.deleteById);
router.get('/getById', query('movie_id').not().isEmpty(), movieController.getById);
router.get('/getAll', query('sort').not().isEmpty(), movieController.getAll);

module.exports = router;