const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const posterSchema = new Schema({
    title: String, 
    description: String,
    datetime: Date,
    userId: String
});

module.exports = mongoose.model('poster', posterSchema, 'posters');