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
    } catch (error) {
        thrownError = error;
    }
    expect(thrownError).not.toBeNull();
    expect(thrownError).toBeInstanceOf(mongoose.Error.ValidationError);
});

test("StatDocument.save() saves a document correctly and doesn't throw an error.", async () => {
    const statName: String = "Fake stat name for stat model test random text: asd;lkfh1084";
    const statValues = { name: statName };

    let thrownError = null;
    try {
        const savedStat = await new statModel(statValues).save();
        expect(savedStat.name).toEqual(statValues.name);
    } catch (error) {
        thrownError = error;
    }
    expect(thrownError).toBeNull();
});
