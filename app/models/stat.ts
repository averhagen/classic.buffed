import mongoose = require("mongoose");

const collectionName: string = "stat";

const nameFieldOptions = { type: String, required: true };

const schemaDefinition: mongoose.SchemaDefinition = {
    name: nameFieldOptions
};

const statSchema = new mongoose.Schema(
    schemaDefinition,
    { collection: collectionName }
);

interface StatDocument extends mongoose.Document {
    name: typeof nameFieldOptions.type
}


export { statSchema }