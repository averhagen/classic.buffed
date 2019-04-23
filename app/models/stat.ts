import mongoose = require("mongoose");

const collectionName: string = "stat";
const nameFieldOptions = { type: String, required: true };

const statSchemaDefinition: mongoose.SchemaDefinition = {
    name: nameFieldOptions
};

const statSchema = new mongoose.Schema(
    statSchemaDefinition,
    { collection: collectionName }
);

export { statSchema }