import mongoose = require('mongoose');

const collectionName = "buff_category";
const nameFieldOptions = { type: String, required: true };

interface BuffCategoryFields {
    name: string;
}

interface BuffCategoryDocument extends BuffCategoryFields, mongoose.Document {
}

const BuffCategorySchema = new mongoose.Schema({
    name: nameFieldOptions
}, { collection: collectionName });

const BuffCategoryModel = mongoose.model<BuffCategoryDocument>(collectionName, BuffCategorySchema);

export { BuffCategoryFields, BuffCategoryDocument, BuffCategoryModel };