const moviesModel = require('../models/movies');
const {isValidObjectId} = require("mongoose");
const {validationResult} = require("express-validator");

module.exports = ({
    async getById(req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        var movieInfo = await moviesModel.findById(req.query.movie_id);
        if (movieInfo) {
            res.json({status: 200, "message": "data found", data: {movies: movieInfo}})
        } else {
            res.json({status: 404, "message": "no record found"})
        }
    },

    async getAll(req, res, next) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let moviesList = [];
        var movies = await moviesModel.find({}).sort(req.query.sort);
        if (!movies) {
            res.json({status: 404, "message": "no record found"})
        } else {
            //we will push movies into array
            for (let movie of movies) {
                moviesList.push({id: movie._id, name: movie.name, type: movie.type, released_on: movie.released_on})
            }
            res.json({status: 200, "message": "list of movies", data: {movie: moviesList}})
        }
    },

    async create(req, res, next) {
        const {validationResult} = require("express-validator");
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        var result = await moviesModel.create({
            name: req.body.name,
            type: req.body.type,
            released_on: req.body.released_on
        });
        if (!result) {
            res.json({status: 400, "message": "cannot add movies", data: null})
        } else {
            res.json({status: 200, "message": "successfully added", data: null})
        }
    },

    async deleteById(req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        if (!isValidObjectId(req.query.movie_id)) {
            res.json({status: "error", "message": "not a valid ID"})
        }
        var result = await moviesModel.findByIdAndRemove(req.query.movie_id);
        if (!result) {
            res.json({status: 400, "message": "cannot delete this time", data: null})
        } else {
            res.json({status: 200, "message": "successfully deleted", data: null})
        }
    },
    async updateById(req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        var movieInfo = await moviesModel.findByIdAndUpdate(req.query.movie_id, {name: req.body.name});
        if (!movieInfo)
            res.json({status: "error", message: "unable to update", data: null});
        else {
            res.json({status: "success", message: "Movie updated successfully!!!", data: movieInfo});
        }
    },

})