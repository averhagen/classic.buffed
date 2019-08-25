import mongoose = require("mongoose");
import * as connection_utils from "../../test_utils/connection_utils";
import { StatCategoryModel } from "../stat_category";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

test("StatCategoryDocument.validate() throws an error when trying to validate a document without values.", async () => {
    const docWithoutValues = {};
    const statCategoryDoc = await new StatCategoryModel(docWithoutValues);
    expect.assertions(1);
    try {
        await statCategoryDoc.validate();
    } catch (error) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
});