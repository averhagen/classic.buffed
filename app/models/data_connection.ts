import mongoose = require('mongoose');

const uri: string = "mongodb://127.0.0.1:27017";

const options = {
    useNewUrlParser: true,
    dbName: process.env.CLASSIC_DB,
    authSource: process.env.CLASSIC_DB,
    user: process.env.CLASSIC_USR,
    pass: process.env.CLASSIC_PWD
};

mongoose.connect(uri, options).catch((error) => {
    console.log("Error connecting to Mongo database.")
    console.log(error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from Mongo database:' + mongoose.connection.db.databaseName);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo database: ' + mongoose.connection.db.databaseName);
});

export default mongoose.connection;