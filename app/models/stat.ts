import mongoose = require("mongoose");


const statSchema = new mongoose.Schema({
    name: String,
}, { collection: 'stat'});

export { statSchema }