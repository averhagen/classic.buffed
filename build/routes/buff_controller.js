"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var buff_1 = require("../models/buff");
var Buff = mongoose.model('buff', buff_1.buffSchema);
var BuffController = /** @class */ (function () {
    function BuffController() {
    }
    BuffController.prototype.addNewBuff = function (req, res) {
        console.log("Received buff post request: " + req.url);
        var newBuff = new Buff({ name: req.query["name"], rank: req.query["rank"] });
        newBuff.save(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    BuffController.prototype.getBuffs = function (req, res) {
        console.log("Received buff get request: " + req.url);
        Buff.find({}, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    return BuffController;
}());
exports.BuffController = BuffController;
