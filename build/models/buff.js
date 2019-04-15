"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var buffSchema = new mongoose.Schema({
    name: String,
    rank: Number,
}, { collection: 'buff' });
exports.buffSchema = buffSchema;
