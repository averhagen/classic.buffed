import mongoose = require('mongoose');
import { BuffModel } from './buff';
import { statModel } from './stat';

const collectionName: string = "buff_stat_value";
const valueFieldOptions = { type: Number };
const buffFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: BuffModel.modelName };
const statFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: statModel.modelName };

interface BuffStatValueDocument extends mongoose.Document {
    value: typeof valueFieldOptions.type,
    buff: typeof buffFieldOptions.type,
    stat: typeof statFieldOptions.type
}

const buffStateValueSchema = new mongoose.Schema({
    value: valueFieldOptions,
    buff: buffFieldOptions,
    stat: statFieldOptions
});

export const BuffStatValue = mongoose.model<BuffStatValueDocument>(collectionName, buffStateValueSchema);