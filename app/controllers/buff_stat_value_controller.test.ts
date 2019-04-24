import mongoose = require('mongoose');

beforeAll(async () => {
    const options = {
        useNewUrlParser: true,
        dbName: global.test_env.__MONGO_DB_NAME__
    }
    await mongoose.connect(global.test_env.__MONGO_URI__, options);
});

afterAll(async () => {
    await mongoose.connection.close();
});


test("Test that the connected mongo db name matches the mongo db name param.", () => {
    expect(mongoose.connection.db.databaseName).toBe(global.test_env.__MONGO_DB_NAME__);
})