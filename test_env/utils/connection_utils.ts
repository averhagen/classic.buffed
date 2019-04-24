import mongoose = require("mongoose");

export async function start_connection_to_test_db() {
    const options = {
        useNewUrlParser: true,
        dbName: global.test_env.__MONGO_DB_NAME__
    }
    await mongoose.connect(global.test_env.__MONGO_URI__, options);
}

export async function stop_connection_to_test_db() {
    await mongoose.connection.close();
}