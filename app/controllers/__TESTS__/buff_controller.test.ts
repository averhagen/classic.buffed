import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { BuffModel } from "../../models/buff";
import { BuffController } from "../buff_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("BuffController.createBuff() returns an error when sent a request with empty query params.", async () => {

    const emptyQueryParams = {};

    const req: any = {
        query: emptyQueryParams
    };

    const res: any = {
        json: jest.fn()
    };

    const next = jest.fn();
    await new BuffController().createBuff(req, res, next);
    expect(next).toBeCalled();
    expect(res.json).not.toBeCalled();
});


test("BuffController.createBuff() returns an error when sent a request with invalid rank value.", async () => {

    const invalidBuffRank = "Invalid rank value with random text: asdfnzxcvoyqwe90";
    const validBuffName = "Valid name value with random text: as;dlnzxqoeui0841";

    const req: any = {
        query: {
            rank: invalidBuffRank,
            name: validBuffName
        },
    };

    const res: any = {
        json: jest.fn()
    };

    const next = jest.fn();
    await new BuffController().createBuff(req, res, next);
    expect(next).toBeCalled();
    expect(res.json).not.toBeCalled();
});

test("BuffController.createBuff() returns an error when sent a request with empty buff name.", async () => {

    const validBuffRank = 22;
    const emptyBuffName = undefined;

    const req: any = {
        query: {
            rank: validBuffRank,
            name: emptyBuffName
        },
    };

    const res: any = {
        json: jest.fn()
    };

    const next = jest.fn();
    await new BuffController().createBuff(req, res, next);
    expect(next).toBeCalled();
    expect(res.json).not.toBeCalled();
});

test("BuffController.createBuff() creates a buff when sent a request with valid body.", async () => {

    const buffName: string = "Buff Controller Buff";
    const buffRank: number = 2;

    const req: any = {
        body: {
            name: buffName,
            rank: buffRank
        },
    };

    expect(await BuffModel.findOne({ name: buffName, rank: buffRank }).exec()).toBeNull();

    const res: any = {
        redirect: jest.fn()
    };
    const next = jest.fn();
    await new BuffController().createBuff(req, res, next);

    expect(res.redirect).toBeCalled();
    expect(next).not.toBeCalled();

    const createdBuff: any = await BuffModel.findOne({ name: buffName, rank: buffRank }).exec();
    expect(createdBuff.name).toEqual(buffName);
    expect(createdBuff.rank).toEqual(buffRank);
});

test("BuffController.getBuff() returns the correct buff when sent valid query params", async () => {

    const buffValues = {
        name: "BuffController.getBuff() intented test buff name",
        rank: 3
    };

    const falseBuffValues = {
        name: "BuffController.getBuff() false test buff name",
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
    const next = jest.fn();
    await new BuffController().getBuffs(req, res, next);

    expect(res.json).toBeCalledWith(expect.objectContaining(buffValues));
    expect(res.json).not.toBeCalledWith(expect.objectContaining(falseBuffValues));
    expect(next).not.toBeCalled();
});

test("BuffController.getBuff() returns an error when sent invalid query params.", async () => {

    const req: any = {
        query: {
        }
    };

    const res: any = {
        json: jest.fn()
    };

    const next = jest.fn();

    await new BuffController().getBuffs(req, res, next);

    expect(res.json).not.toBeCalled();
    expect(next).toBeCalled();
});

test("BuffController.deleteBuff() deletes the appropriate buff sent in.", async () => {

    const buffValues = { rank: 1, name: "Buff name for deleteBuff test #1" };

    const createdBuff = await BuffModel.create(buffValues);
    console.log("Created Buff with ID: " + createdBuff.id);

    const req: any = {
        query: { _id: createdBuff.id }
    };
    const res: any = { send: jest.fn() };
    const next = jest.fn();

    const findBuff = async () => {
        return await BuffModel.findOne(buffValues);
    }

    expect(await findBuff()).not.toBeNull();

    await new BuffController().deleteBuff(req, res, next);

    expect(await findBuff()).toBeNull();
    expect(next).not.toBeCalled();
});

test("BuffController.deleteBuff() throws an error when sent empty query.", async () => {

    const req: any = {
        query: {}
    };
    const res: any = { send: jest.fn() };
    const next = jest.fn();

    await new BuffController().deleteBuff(req, res, next);
    expect(next).toBeCalled();
});