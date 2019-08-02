import { startConnectionToTestDB, stopConnectionToTestDB } from "../../../test_utils/connection_utils";
import { statModel } from "../../../models/stat";
import { StatController } from "../stat_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("StatController.createStat() returns an error when sent a request with invalid query params.", async () => {

    const invalidStatName = "";
    const req: any = {
        query: {
            name: invalidStatName
        }
    };

    const res: any = {
        json: jest.fn(),
    };

    const next = jest.fn();

    await new StatController().createStat(req, res, next);
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalled();
});


test("StatController.createStat() makes the correct stat when sent a request with valid params.", async () => {

    const statName: string = "StatController.createStat() valid stat name yhzxysadf";

    const req: any = {
        query: {
            name: statName
        },
    };

    expect(await statModel.findOne(req.query)).toBeNull();

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    };

    const next = jest.fn();
    await new StatController().createStat(req, res, next);

    expect(res.json).toBeCalledWith(expect.objectContaining(req.query));
    expect(next).not.toBeCalled();

    const createdStat: any = await statModel.findOne(req.query).exec();
    expect(createdStat.name).toEqual(statName);
});

test("StatController.deleteStat() throws an error when sent empty query.", async () => {

    const req: any = {
        query: {}
    };
    const res: any = { send: jest.fn() };
    const next = jest.fn();

    await new StatController().deleteStat(req, res, next);
    expect(next).toBeCalled();
});

test("StatController.deleteStat() deletes the appropriate stat when a request with the correct _id is made.", async () => {

    const statValues = { name: "Stat name for deleted stat mongo test." };

    const createdStat = await statModel.create(statValues);
    const req: any = {
        query: { _id: createdStat.id }
    };
    const res: any = { send: jest.fn() };
    const next = jest.fn();

    const findStat = async () => {
        return await statModel.findOne(statValues);
    }

    expect(await findStat()).not.toBeNull();

    await new StatController().deleteStat(req, res, next);

    expect(await findStat()).toBeNull();
    expect(next).not.toBeCalled();
});

test("StatController.editStat() correctly edits the value of a stat when sent a valid request.", async () => {

    const unEditedStatValues = { name: "Unedited stat name test #1" };

    const unEditedStat = await statModel.create(unEditedStatValues);

    const editedStatValues = { name: "Edited name", _id: unEditedStat._id };

    expect(unEditedStat.name).not.toEqual(editedStatValues.name);

    const req: any = {
        query: editedStatValues
    };

    const res: any = {
    };

    const next = jest.fn();

    await new StatController().editStat(req, res, next);

    const editedStat = await statModel.findOne({ _id: unEditedStat._id });

    expect(editedStat).not.toBeNull();

    if (editedStat) {
        expect(editedStat.name).not.toEqual(unEditedStat.name);
    }
});