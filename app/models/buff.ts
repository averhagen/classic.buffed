import mongoose = require('mongoose');

const buffSchema = new mongoose.Schema({
    name: String,
    rank: Number,
}, { collection: 'buff'});

export { buffSchema };