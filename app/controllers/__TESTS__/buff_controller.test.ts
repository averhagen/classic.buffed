import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { BuffModel } from "../../models/buff";
import { BuffController } from "../buff_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("BuffController.createBuff() creates a buff when sent a request with valid params.", async () => {

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

    const next = jest.fn();
    await buffController.createBuff(req, res, next);

    expect(res.json).toBeCalled();
    expect(next).not.toBeCalled();

    const createdBuff: any = await BuffModel.findOne({ name: buffName, rank: buffRank }).exec();
    expect(createdBuff.name).toEqual(buffName);
    expect(createdBuff.rank).toEqual(buffRank);
});

test("That using the getBuff method of Buff returns the correct buff", async () => {

    const buffValues = {
        name: "Get buff test name",
        rank: 3
    };

    const falseBuffValues = {
        name: "Bad Value",
        rank: 6
    }

    const req: any = {
        query: {
            name: buffValues.name,
            rank: buffValues.rank
        },
    };

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    };

    await new BuffModel(buffValues).save();
    await new BuffController().getBuffs(req, res);

    expect(res.json).toBeCalledWith(expect.objectContaining(buffValues));
    expect(res.json).not.toBeCalledWith(expect.objectContaining(falseBuffValues));
});