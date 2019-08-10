import mongoose = require('mongoose');
import { BuffCategoryModel, BuffCategoryDocument } from './buff_category';

const buffCollectionName: string = "buff";
const nameFieldOptions = { type: String, required: true };
const rankFieldOptions = { type: Number, required: true };
const buffCategoryFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: BuffCategoryModel.modelName, required: false };

interface BuffFields {
    name: string,
    rank: number,
    buff_category?: BuffCategoryDocument['_id']
}

interface BuffDocument extends BuffFields, mongoose.Document {
}

const buffSchema = new mongoose.Schema({
    name: nameFieldOptions,
    rank: rankFieldOptions,
    buff_category: buffCategoryFieldOptions
}, { collection: buffCollectionName });

const BuffModel = mongoose.model<BuffDocument>(buffCollectionName, buffSchema);

export { BuffFields, BuffDocument, BuffModel };