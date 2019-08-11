import * as connection_utils from "../../test_utils/connection_utils";
import { BuffModel, BuffFields } from "../buff";
import { BuffCategoryDocument, BuffCategoryModel } from "../buff_category";

beforeAll(connection_utils.startConnectionToTestDB);

afterAll(connection_utils.stopConnectionToTestDB);

connection_utils.testConnectionIsValid();

test("That validating a Buff without a Rank or Name throws an error", async () => {
    const docWithoutRankOrBuffAttribute = {};
    const buffDocument = new BuffModel(docWithoutRankOrBuffAttribute);
    expect(buffDocument.validate).toThrow();
});

test("That validating Buff without a name throws an error.", async () => {
    const docWithoutNameAttribute = { rank: 2 };
    const buffDocument = new BuffModel(docWithoutNameAttribute);
    expect(buffDocument.validate).toThrow();
});

test("That validating a Buff without a Rank throws an error.", async () => {
    const docWithoutRankAttribute = { name: "Buff Without a rank" };
    const buffDocument = new BuffModel(docWithoutRankAttribute);
    expect(buffDocument.validate).toThrow();
});

test("That validating a Buff without a category doesn't throw an error.", async () => {
    const buffValuesWithoutCategory: BuffFields = { name: "Buff with a rank for testing buff.test.ts", rank: 22 };
    const buffDocument = new BuffModel(buffValuesWithoutCategory);
    try {
        await buffDocument.validate();
    } catch (error) {
        expect(error).toBeNull();
    }
});

test("That valid buff is saved with the proper values.", async () => {
    const buffName: string = "Divine Spirit";
    const buffRank: number = 1;

    let buffCategory: BuffCategoryDocument;

    try {
        buffCategory = await new BuffCategoryModel({ name: "category name for buff testing." }).save();
        const buffFields: BuffFields = { name: buffName, rank: buffRank, buff_category: buffCategory._id };

        try {
            const savedBuff = await new BuffModel(buffFields).save();
            expect(savedBuff.name).toEqual(buffName);
            expect(savedBuff.rank).toEqual(buffRank);
            await BuffModel.populate(savedBuff, { path: 'buff_category' });
            const savedBuffCategory = savedBuff.buff_category;
            if (savedBuffCategory) {
                expect(savedBuffCategory._id).toEqual(buffCategory._id);
                expect(savedBuffCategory.name).toEqual(buffCategory.name);
            } else {
                throw Error("savedBuffCategory is undefined");
            }
        } catch (error) {
            expect(error).toBeNull();
        }
    } catch (error) {
        expect(error).toBeNull();
    }
});
