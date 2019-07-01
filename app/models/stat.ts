import mongoose = require("mongoose");

const collectionName: string = "stat";
const nameFieldOptions = { type: String, required: true };

interface StatDocument extends mongoose.Document {
    name: typeof nameFieldOptions.type
}

const statSchema = new mongoose.Schema(
    { name: nameFieldOptions },
    { collection: collectionName }
);

const statModel = mongoose.model<StatDocument>(collectionName, statSchema);

export { statSchema, statModel, StatDocument }