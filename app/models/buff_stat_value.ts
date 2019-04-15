import mongoose = require('mongoose');

const buffStateValueSchema = new mongoose.Schema({
    value: Number,
    buff: { type: mongoose.Schema.Types.ObjectId, ref: 'buff' },
    stat: { type: mongoose.Schema.Types.ObjectId, ref: 'stat' }
});

export const BuffStatValue = mongoose.model('buff_stat_value', buffStateValueSchema);