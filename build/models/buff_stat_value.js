"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var buff_1 = require("./buff");
var stat_1 = require("./stat");
var collectionName = "buff_stat_value";
var valueFieldOptions = { type: Number };
var buffFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: buff_1.BuffModel.modelName };
var statFieldOptions = { type: mongoose.Schema.Types.ObjectId, ref: stat_1.statModel.modelName };
var buffStateValueSchema = new mongoose.Schema({
    value: valueFieldOptions,
    buff: buffFieldOptions,
    stat: statFieldOptions
});
exports.BuffStatValue = mongoose.model(collectionName, buffStateValueSchema);
