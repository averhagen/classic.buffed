import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { BuffModel } from "../../models/buff";
import { BuffController } from "../buff_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("Using the buff controller to make a buff creates a buff with the correct values.", async () => {

    const buffName: string = "Buff Controller Buff";
    const buffRank: number = 2;

    const req: any = {
        query: {
            name: buffName,
            rank: buffRank
        },
    };

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    };

    expect(await BuffModel.findOne({ name: buffName, rank: buffRank }).exec()).toBeNull();

    const buffController = new BuffController();

    await buffController.createBuff(req, res);

    expect(res.json).toBeCalled();
    expect(res.send).not.toBeCalled();

    const createdBuff: any = await BuffModel.findOne({ name: buffName, rank: buffRank }).exec();
    expect(createdBuff.name).toEqual(buffName);
    expect(createdBuff.rank).toEqual(buffRank);
});