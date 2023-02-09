const userMovies = require('../models/userMovies');
const {isValidObjectId} = require("mongoose");
const {validationResult} = require("express-validator");

module.exports = {
    createUserMovies: function (req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        return new Promise((resolve, reject) => {
            console.log("start promise resolving")
            userMovies.create({
                movies: req.body.movies,
                added_on: req.body.added_on,
                user_id: req.body.user_id
            }).then((resolve) => {
                res.json({status: 200, "message": "movie added successfully"})
            }).catch((reject) => {
                res.json({status: 400, "message": "not inserted with error" + reject});
            });
        })
    },

    getUserMovies: function (req, res) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        if (!isValidObjectId(req.query.user_id)) {
            res.json({"message": "please provide valid mongoId"});
        }
        let moviesList = [];
        return new Promise((resolve, reject) => {
            userMovies.find({user_id: req.query.user_id, movies: {'$in': req.query.movies}}).then((resolve) => {
                if (resolve) {
                    Object.keys(resolve).forEach(key => {
                        moviesList.push({
                            id: resolve[key]._id,
                            movies: resolve[key].movies,
                            added_on: resolve[key].added_on
                        })
                    });
                    res.json({status: 200, "message": "record found", data: {"user_movies": moviesList}})
                } else {
                    res.json({status: 404, "message": "no record found", data: null})
                }
            }).catch((reject) => {
                res.json({status: 500, "message": "error finding " + reject})
            });
        });
    }
}
