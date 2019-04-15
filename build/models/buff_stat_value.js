"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var buffStateValueSchema = new mongoose.Schema({
    value: Number,
    buff: { type: mongoose.Schema.Types.ObjectId, ref: 'buff' },
    stat: { type: mongoose.Schema.Types.ObjectId, ref: 'stat' }
});
exports.BuffStatValue = mongoose.model('buff_stat_value', buffStateValueSchema);
