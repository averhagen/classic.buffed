"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Connect to mongo database via import side effects.
Promise.resolve().then(function () { return __importStar(require('./data_connection')); });
var buff_controller_1 = require("./routes/buff_controller");
var stat_controller_1 = require("./routes/stat_controller");
var buff_stat_value_controller_1 = require("./routes/buff_stat_value_controller");
// Create a new express application instance
var app = express();
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// Controller and methods used for the Buff api
var buffController = new buff_controller_1.BuffController();
app.route('/buff')
    .get(buffController.getBuffs)
    .post(buffController.addNewBuff);
// Controller and routed methods used for Stat API
var statController = new stat_controller_1.StatController();
app.route('/stat')
    .post(statController.addNewStat);
// Controller and routed methods used for BuffStatValue API
var buffStatValueController = new buff_stat_value_controller_1.BuffStatValueController();
app.route('/buffstatvalue')
    .get(buffStatValueController.getBuffStatValue)
    .post(buffStatValueController.addNewBuffStatValue);
// Start app listening on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
