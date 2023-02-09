const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const userMoviesSchema = new Schema ({
    movies : {
        type : [{type: String}],
        required : true,
        trim : true
    },
    added_on : {
        type : Date,
        required : true,
        trim : true
    },
    user_id : {
        type : ObjectId,
        required : true,
        trim : true
}
});

module.exports = mongoose.model('user_movies', userMoviesSchema);