const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

//inject routes in this file
const movies = require('./routes/movies');
const users = require('./routes/users');
const userMovies = require('./routes/userMovies');
const validateToken = require('./middlewares/validateToken');


//database config
const mongose = require('./config/database');
app.set('secretKey', 'jwt-node');

//connecting to mongodb
mongose.connection.on('error', console.error.bind(console, 'Mongo DbConnection Error!...'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(logger('dev'));

app.get("/", function (req, res){
    res.json({"JWT Node" : "JWT Node CRUD"})
})

//public routes
app.use('/users', users);

//private routes
app.use('/movies', validateToken.validateUser, movies);
app.use('/userMovies', validateToken.validateUser, userMovies);


// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
// app.use(function(err, req, res, next) {
//     console.log(err);
//     if(err.status === 404)
//         res.status(404).json({message: "Not found"});
//     else
//         res.status(500).json({message: "Something looks wrong :( !!!"});
// });

app.listen(3002,  () =>{
    console.log("Server is listening on port")
})