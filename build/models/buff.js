"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var buffCollectionName = "buff";
var nameFieldOptions = { type: String, required: true };
var rankFieldOptions = { type: Number, required: true };
var buffSchema = new mongoose.Schema({
    name: nameFieldOptions,
    rank: rankFieldOptions,
}, { collection: buffCollectionName });
var BuffModel = mongoose.model(buffCollectionName, buffSchema);
exports.BuffModel = BuffModel;
