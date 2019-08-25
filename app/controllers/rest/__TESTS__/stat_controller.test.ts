import { StatDocumentFields, statModel } from "../../../models/stat";
import { StatCategoryModel } from "../../../models/stat_category";
import { startConnectionToTestDB, stopConnectionToTestDB } from "../../../test_utils/connection_utils";
import { getUniqueString } from "../../../test_utils/value_generator";
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

    const statCategoryDocument = await new StatCategoryModel({ name: getUniqueString() }).save();

    const statName: string = getUniqueString();

    const req: any = {
        query: {
            name: statName,
            stat_category: statCategoryDocument._id
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

    const statCategoryDocument = await new StatCategoryModel({ name: getUniqueString() }).save();

    const statValues: StatDocumentFields = { stat_category: statCategoryDocument._id, name: getUniqueString() };

    const findStat = async () => {
        return await statModel.findOne(statValues);
    }

    expect(await findStat()).toBeNull();

    const createdStat = await statModel.create(statValues);

    const req: any = {
        query: { _id: createdStat.id }
    };

    const res: any = { send: jest.fn() };

    const next = jest.fn();

    expect(await findStat()).not.toBeNull();

    await new StatController().deleteStat(req, res, next);

    expect(await findStat()).toBeNull();
    expect(next).not.toBeCalled();
});

test("StatController.editStat() correctly edits the value of a stat when sent a valid request.", async () => {

    const startingStatCategory = await new StatCategoryModel({ name: getUniqueString() }).save();
    const unEditedStatValues: StatDocumentFields = { stat_category: startingStatCategory._id, name: "Unedited stat name test #1" };
    const unEditedStat = await statModel.create(unEditedStatValues);


    const endingStatCategory = await new StatCategoryModel({ name: getUniqueString() }).save();
    const editedStatValues = { stat_category: endingStatCategory._id, name: "Edited name", _id: unEditedStat._id };

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
        expect(editedStat.name).toEqual(editedStatValues.name);
        expect(editedStat.stat_category).toEqual(editedStatValues.stat_category);

        expect(editedStat.name).not.toEqual(unEditedStat.name);
    }
});