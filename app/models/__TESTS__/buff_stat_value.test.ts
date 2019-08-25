import * as connection_utils from "../../test_utils/connection_utils";
import { getUniqueNumber, getUniqueString } from "../../test_utils/value_generator";
import { BuffModel } from "../buff";
import { BuffStatValue } from "../buff_stat_value";
import { StatDocumentFields, statModel } from "../stat";
import { StatCategoryFields, StatCategoryModel } from "../stat_category";

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
    const buffValues = { name: getUniqueString(), rank: getUniqueNumber() };
    const mockBuff = await new BuffModel(buffValues).save();

    const statCategoryValues: StatCategoryFields = { name: getUniqueString() };
    const mockStatCategory = await new StatCategoryModel(statCategoryValues).save();

    const statValues: StatDocumentFields = { name: getUniqueString(), stat_category: mockStatCategory._id };
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
    const buffValues = { name: getUniqueString(), rank: getUniqueNumber() };
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

test("BuffStatValue.save() fails when trying to save a BuffStatValue without a buff.", async () => {

    const categoryValues: StatCategoryFields = { name: getUniqueString() };
    const mockCategory = await new StatCategoryModel(categoryValues).save();

    const statValues: StatDocumentFields = { stat_category: mockCategory._id, name: getUniqueString() };
    const mockStat = await new statModel(statValues).save();

    let errorThrown = false;

    try {
        await new BuffStatValue({ value: getUniqueNumber(), stat: mockStat }).save();
    } catch (error) {
        errorThrown = true;
    }

    expect(errorThrown).toBe(true);
});

