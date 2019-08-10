import mongoose = require("mongoose");
import * as connection_utils from "../../test_utils/connection_utils";
import { BuffCategoryModel } from "../buff_category";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

test("BuffCategoryDocument.save() throws an error when trying to save a stat document without values.", async () => {
    let thrownError;
    try {
        await new BuffCategoryModel({}).save();
    } catch (error) {
        thrownError = error;
    }
    expect(thrownError).not.toBeNull();
    expect(thrownError).toBeInstanceOf(mongoose.Error.ValidationError);
});