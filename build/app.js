"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var connection = require("./models/connect");
// Create a new express application instance
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
connection.default;
