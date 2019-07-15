import mongoose = require('mongoose');

const buffCollectionName: string = "buff";
const nameFieldOptions = { type: String, required: true };
const rankFieldOptions = { type: Number, required: true };

interface BuffDocument extends mongoose.Document {
    name: string,
    rank: number
}

const buffSchema = new mongoose.Schema({
    name: nameFieldOptions,
    rank: rankFieldOptions
}, { collection: buffCollectionName });

const BuffModel = mongoose.model<BuffDocument>(buffCollectionName, buffSchema);

export { BuffDocument, BuffModel };