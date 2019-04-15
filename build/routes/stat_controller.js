"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var stat_1 = require("../models/stat");
var StatModel = mongoose.model('stat', stat_1.statSchema);
var StatController = /** @class */ (function () {
    function StatController() {
    }
    StatController.prototype.addNewStat = function (req, res) {
        var newStat = new StatModel({ name: req.query["name"] });
        newStat.save(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    return StatController;
}());
exports.StatController = StatController;
