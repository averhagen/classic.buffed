"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buff_1 = require("../models/buff");
var BuffController = /** @class */ (function () {
    function BuffController() {
    }
    BuffController.prototype.addNewBuff = function (req, res) {
        console.log("Received buff post request: " + req.url);
        var newBuff = new buff_1.BuffModel({ name: req.query["name"], rank: req.query["rank"] });
        newBuff.save(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    BuffController.prototype.getBuffs = function (req, res) {
        console.log("Received buff get request: " + req.url);
        buff_1.BuffModel.find({}, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    return BuffController;
}());
exports.BuffController = BuffController;
