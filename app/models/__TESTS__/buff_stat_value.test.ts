import * as connection_utils from "../../test_utils/connection_utils";
import { BuffModel } from "../buff";
import { BuffStatValue } from "../buff_stat_value";
import { statModel } from "../stat";

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

test("BuffStatValue.save() fails when trying to save a BuffStatValue without a value.", async () => {
    const buffValues = { name: "aas;dlkfjnoieu fake buff name", rank: 32 };
    const mockBuff = await new BuffModel(buffValues).save();

    const statValues = { name: "aasdoyqweouzlkjdf fake name" };
    const mockStat = await new statModel(statValues).save();

    let errorThrown = false;

    try {
        await new BuffStatValue({ buff: mockBuff, stat: mockStat }).save();
    } catch (error) {
        errorThrown = true;
    }

    expect(errorThrown).toBe(true);
});

test("BuffStatValue.save() fails when trying to save a BuffStatValue without a stat.", async () => {
    const buffValues = { name: "buff_stat_value.test #3 fake buff name", rank: 32 };
    const mockBuff = await new BuffModel(buffValues).save();

    const mockValue = 23;

    let errorThrown = false;

    try {
        await new BuffStatValue({ buff: mockBuff, value: mockValue }).save();
    } catch (error) {
        errorThrown = true;
    }

    expect(errorThrown).toBe(true);
});
