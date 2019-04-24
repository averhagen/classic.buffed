"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var collectionName = "stat";
var nameFieldOptions = { type: String, required: true };
var statSchema = new mongoose.Schema({ name: nameFieldOptions }, { collection: collectionName });
exports.statSchema = statSchema;
var statModel = mongoose.model(collectionName, statSchema);
exports.statModel = statModel;
