"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buff_stat_value_1 = require("../models/buff_stat_value");
var BuffStatValueController = /** @class */ (function () {
    function BuffStatValueController() {
    }
    BuffStatValueController.prototype.addNewBuffStatValue = function (req, res) {
        var newStatValue = new buff_stat_value_1.BuffStatValue({
            buff: req.body["buff"],
            stat: req.body["stat"],
            value: req.body["value"]
        });
        newStatValue.save(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    BuffStatValueController.prototype.getBuffStatValue = function (req, res) {
        buff_stat_value_1.BuffStatValue.findOne().and([
            { buff: req.body["buff"] },
            { stat: req.body["stat"] }
        ]).populate('buff').populate('stat').exec(function (err, buffStatValue) {
            if (err) {
                res.send(err);
            }
            res.json(buffStatValue);
        });
    };
    return BuffStatValueController;
}());
exports.BuffStatValueController = BuffStatValueController;
