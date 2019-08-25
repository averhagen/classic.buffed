import mongoose = require("mongoose");
import * as connection_utils from "../../test_utils/connection_utils";
import { getUniqueString } from "../../test_utils/value_generator";
import { StatDocumentFields, statModel } from "../stat";
import { StatCategoryFields, StatCategoryModel } from "../stat_category";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

connection_utils.testConnectionIsValid();

test("StatDocument.save() throws an error when trying to save a stat document without values.", async () => {
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

    const statCategoryFields: StatCategoryFields = { name: getUniqueString() };
    const statCategoryDocument = await new StatCategoryModel(statCategoryFields).save();

    const statValues: StatDocumentFields = { stat_category: statCategoryDocument._id, name: getUniqueString(), };

    let thrownError = null;
    try {
        const savedStat = await new statModel(statValues).save();
        expect(savedStat.name).toEqual(statValues.name);
        expect(savedStat.stat_category).toEqual(statCategoryDocument._id);
    } catch (error) {
        thrownError = error;
    }
    expect(thrownError).toBeNull();
});
