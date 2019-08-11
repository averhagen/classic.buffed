import mongoose = require('mongoose');

const collectionName = "stat_category";
const nameFieldOptions = { type: String, required: true };

interface StatCategoryFields {
    name: string;
}

interface StatCategoryDocument extends StatCategoryFields, mongoose.Document {
}

const StatCategorySchema = new mongoose.Schema({
    name: nameFieldOptions
}, { collection: collectionName });

const StatCategoryModel = mongoose.model<StatCategoryDocument>(collectionName, StatCategorySchema);

export { StatCategoryFields, StatCategoryDocument, StatCategoryModel };