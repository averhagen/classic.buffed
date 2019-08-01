import { startConnectionToTestDB, stopConnectionToTestDB } from "../../../test_utils/connection_utils";
import { BuffModel } from "../../../models/buff";
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

    const req: any = {
        query: { _id: createdBuff.id }
    };
    const res: any = { send: jest.fn() };
    const next = jest.fn();

    const findBuff = async () => {
        return await BuffModel.findOne(createdBuff._id);
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

test("BuffController.editBuff() changes the values of a buff to the requested values.", async () => {
    const startingBuffValues = { name: "Starting value for edit buff test", rank: 0 };

    const startingBuff = await BuffModel.create(startingBuffValues);

    const endingBuffValues = { _id: startingBuff._id, name: "Changed Value", rank: startingBuffValues.rank + 1 };

    const req: any = { query: endingBuffValues };
    const res: any = { send: jest.fn() };
    const next: any = jest.fn();

    await new BuffController().editBuff(req, res, next);

    expect(next).not.toBeCalled();

    const changedBuff = await BuffModel.findOne({ _id: startingBuff._id }).exec();

    expect(changedBuff).not.toBeNull();

    if (changedBuff != null) {
        expect(changedBuff.name).toEqual(endingBuffValues.name);
        expect(changedBuff.rank).toEqual(endingBuffValues.rank);
        expect(changedBuff._id).toEqual(endingBuffValues._id);
    }
});

test("BuffController.editBuff() appropriately handles edits without a rank value.", async () => {
    const startingBuffValues = { name: "Starting value for edit buff test #2", rank: 0 };

    const startingBuff = await BuffModel.create(startingBuffValues);

    const endingBuffValues = { _id: startingBuff._id, name: "Changed Value" };

    const req: any = { query: endingBuffValues };
    const res: any = { send: jest.fn() };
    const next: any = jest.fn();

    await new BuffController().editBuff(req, res, next);

    expect(next).not.toBeCalled();

    const changedBuff = await BuffModel.findOne({ _id: startingBuff._id }).exec();

    expect(changedBuff).not.toBeNull();

    if (changedBuff != null) {
        expect(changedBuff.rank).toEqual(startingBuff.rank);
        expect(changedBuff.name).toEqual(endingBuffValues.name);
        expect(changedBuff._id).toEqual(endingBuffValues._id);
    }
});

test("BuffController.editBuff() appropriately handles edits without a name value.", async () => {
    const startingBuffValues = { name: "Starting value for edit buff test #3", rank: 0 };

    const startingBuff = await BuffModel.create(startingBuffValues);

    const endingBuffValues = { _id: startingBuff._id, rank: startingBuffValues.rank + 1 };

    expect(startingBuffValues.rank).not.toEqual(endingBuffValues.rank);

    const req: any = { query: endingBuffValues };
    const res: any = { send: jest.fn() };
    const next: any = jest.fn();

    await new BuffController().editBuff(req, res, next);

    expect(next).not.toBeCalled();

    const changedBuff = await BuffModel.findOne({ _id: startingBuff._id }).exec();

    expect(changedBuff).not.toBeNull();

    if (changedBuff != null) {
        expect(changedBuff.name).toEqual(startingBuffValues.name);
        expect(changedBuff.rank).toEqual(endingBuffValues.rank);
        expect(changedBuff._id).toEqual(endingBuffValues._id);
    }
});

test("BuffController.editBuff() sends error with edit request with invalid rank data.", async () => {
    const startingBuffValues = { name: "Starting value for edit buff test #2", rank: 0 };

    const startingBuff = await BuffModel.create(startingBuffValues);

    const endingBuffValues = { _id: startingBuff._id, name: "Changed Value", rank: "Invalid data, rank should be a number." };

    const req: any = { query: endingBuffValues };
    const res: any = { send: jest.fn() };
    const next: any = jest.fn();

    await new BuffController().editBuff(req, res, next);

    expect(next).toBeCalled();

    const changedBuff = await BuffModel.findOne({ _id: startingBuff._id }).exec();

    expect(changedBuff).not.toBeNull();

    if (changedBuff != null) {
        expect(changedBuff.name).toEqual(startingBuff.name);
        expect(changedBuff.rank).toEqual(startingBuff.rank);
        expect(changedBuff._id).toEqual(startingBuff._id);
    }
});

