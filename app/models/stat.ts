import mongoose = require("mongoose");
import { StatCategoryModel, StatCategoryDocument } from "./stat_category";

const collectionName: string = "stat";
const nameFieldOptions = { type: String, required: true };
const statCategoryFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: StatCategoryModel.modelName, required: true }

interface StatDocumentFields {
    name: string,
    stat_category: StatCategoryDocument['_id']
}

interface StatDocument extends mongoose.Document, StatDocumentFields {
}

const statSchema = new mongoose.Schema(
    {
        name: nameFieldOptions,
        stat_category: statCategoryFieldOptions
    },
    { collection: collectionName }
);

const statModel = mongoose.model<StatDocument>(collectionName, statSchema);

export { statSchema, statModel, StatDocument, StatDocumentFields }