import mongoose = require("mongoose");

export async function startConnectionToTestDB() {
    const options = {
        useNewUrlParser: true,
        dbName: global.test_env.__MONGO_DB_NAME__
    }
    await mongoose.connect(global.test_env.__MONGO_URI__, options);
}

export async function stopConnectionToTestDB() {
    await mongoose.connection.close();
}

export async function testConnectionIsValid() {
    test("Test that the connected mongo db name matches the mongo db name param.", () => {
        expect(mongoose.connection.db.databaseName).toBe(global.test_env.__MONGO_DB_NAME__);
    });
}
