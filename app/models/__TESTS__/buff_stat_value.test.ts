import * as connection_utils from "../../test_utils/connection_utils";
import { BuffStatValue } from "../buff_stat_value";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

connection_utils.testConnectionIsValid();

test("BuffStatValue.save() fails when trying to save a BuffStatValue with empty values.", async () => {

    const emptyValues = {};
    let errorThrown = false;
    try {
        await new BuffStatValue(emptyValues).save();
    } catch (error) {
        errorThrown = true;
    }
    expect(errorThrown).toBe(true);
});