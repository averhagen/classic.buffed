import mongoose = require('mongoose');

const collectionName = "buff_category";
const nameFieldOptions = { type: String, required: true };

interface BuffCategoryDocument extends mongoose.Document {
    name: string;
}

const BuffCategorySchema = new mongoose.Schema({
    name: nameFieldOptions
}, { collection: collectionName });

const BuffCategoryModel = mongoose.model<BuffCategoryDocument>(collectionName, BuffCategorySchema);

export { BuffCategoryDocument, BuffCategoryModel };