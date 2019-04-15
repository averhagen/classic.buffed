"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var statSchema = new mongoose.Schema({
    name: String,
}, { collection: 'stat' });
exports.statSchema = statSchema;
