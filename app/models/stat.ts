import mongoose = require("mongoose");

const collectionName: string = "stat";
const nameFieldOptions = { type: String, required: true };

const statSchema = new mongoose.Schema(
    { name: nameFieldOptions },
    { collection: collectionName }
);

interface StatDocument extends mongoose.Document {
    name: typeof nameFieldOptions.type
}

const statModel = mongoose.model<StatDocument>(collectionName, statSchema);

export { statSchema, statModel }