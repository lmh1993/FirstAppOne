const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new Schema({ 
        imgUrl: String,
        publicId: String,
        posterId: String
});

module.exports = mongoose.model('image', imageSchema, 'images');