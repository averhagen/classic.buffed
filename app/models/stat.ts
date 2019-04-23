import mongoose = require("mongoose");

const statCollectionName: string = "stat";

const statSchema = new mongoose.Schema({
    name: String,
}, { collection: statCollectionName });

export { statSchema }