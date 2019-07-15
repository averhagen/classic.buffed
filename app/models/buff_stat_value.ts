import mongoose = require('mongoose');
import { BuffModel, BuffDocument } from './buff';
import { statModel, StatDocument } from './stat';

const collectionName: string = "buff_stat_value";
const valueFieldOptions = { type: Number, required: true };
const buffFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: BuffModel.modelName, required: true };
const statFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: statModel.modelName, required: true };

interface BuffStatValueDocument extends mongoose.Document {
    value: number,
    buff: BuffDocument,
    stat: StatDocument
}

const BuffStateValueSchema = new mongoose.Schema({
    value: valueFieldOptions,
    buff: buffFieldOptions,
    stat: statFieldOptions
});

export { BuffStatValueDocument };
export const BuffStatValue = mongoose.model<BuffStatValueDocument>(collectionName, BuffStateValueSchema);