import * as connection_utils from "../../../test_env/utils/connection_utils";
import { BuffModel } from "../buff";

beforeAll(connection_utils.startConnectionToTestDB);

afterAll(connection_utils.stopConnectionToTestDB);

connection_utils.testConnectionIsValid();

test("That saving a Buff without a name throws an error.", async () => {
    const docWithoutNameAttribute = { rank: 2 };
    const buffDocument = new BuffModel(docWithoutNameAttribute);
    expect(buffDocument.save()).rejects.not.toBeNull();
});

test("That saving a Buff without a Rank throws an error.", async () => {
    const docWithoutRankAttribute = { name: "Buff Without a rank" };
    const buffDocument = new BuffModel(docWithoutRankAttribute);
    expect(buffDocument.save()).rejects.not.toBeNull();
});

test("That saving a Buff without a Rank or Name throws an error", async () => {
    const docWithoutRankOrBuffAttribute = {};
    const buffDocument = new BuffModel(docWithoutRankOrBuffAttribute);
    expect(buffDocument.save()).rejects.not.toBeNull();
});

test("That valid buff is saved with the proper values.", async () => {
    const buffName: String = "Divine Spirit";
    const buffRank: Number = 1;

    const docWithBuffValues = { name: buffName, rank: buffRank };
    const savedBuff = await new BuffModel(docWithBuffValues).save();

    expect(savedBuff.name).toBe(buffName);
    expect(savedBuff.rank).toBe(buffRank);
});
