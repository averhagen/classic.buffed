import mongoose = require("mongoose");
import * as connection_utils from "../../test_utils/connection_utils";
import { statModel } from "../stat";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

connection_utils.testConnectionIsValid();

test("StatDocument.save() throws an error when trying to save a stat document with values.", async () => {
    let thrownError;
    try {
        await new statModel({}).save();
    } catch(error) {
        thrownError = error;
    }
    expect(thrownError).not.toBeNull();
    expect(thrownError).toBeInstanceOf(mongoose.Error.ValidationError);
});