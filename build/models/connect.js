"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var uri = "mongodb://127.0.0.1:27017";
var options = {
    useNewUrlParser: true,
    dbName: process.env.CLASSIC_DB,
    authSource: process.env.CLASSIC_DB,
    user: process.env.CLASSIC_USR,
    pass: process.env.CLASSIC_PWD
};
mongoose.connect(uri, options).catch(function (error) {
    console.log("error connecting to mongo db.");
    console.log(error);
});
mongoose.connection.on('disconnected', function () {
    console.log('Disconnected from Mongo database:' + mongoose.connection.db.databaseName);
});
mongoose.connection.on('connected', function () {
    console.log('Connected to Mongo database: ' + mongoose.connection.db.databaseName);
});
setTimeout(function () {
    mongoose.connection.close();
}, 1000);
exports.default = mongoose.connection;
