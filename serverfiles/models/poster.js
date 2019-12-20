const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const posterSchema = new Schema({
    companyName: String,
    jobTitle: String, 
    description: String,
    datetime: Date,
    userId: String,
    iconId: String,
    iconUrl: String
});

module.exports = mongoose.model('poster', posterSchema, 'posters');