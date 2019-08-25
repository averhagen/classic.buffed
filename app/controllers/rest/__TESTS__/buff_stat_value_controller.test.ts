import { BuffDocument, BuffModel, BuffFields } from "../../../models/buff";
import { BuffStatValue } from "../../../models/buff_stat_value";
import { StatDocument, StatDocumentFields, statModel } from "../../../models/stat";
import { StatCategoryDocument, StatCategoryFields, StatCategoryModel } from "../../../models/stat_category";
import { startConnectionToTestDB, stopConnectionToTestDB } from "../../../test_utils/connection_utils";
import { getUniqueString, getUniqueNumber } from "../../../test_utils/value_generator";
import { BuffStatValueController } from "../buff_stat_value_controller";

beforeAll(async () => {
    await startConnectionToTestDB();

    // Create 10 buffs each with 5 ranks and save buff data.
    const mockBuffDocuments: BuffDocument[] = [];
    for (let i = 0; i < 10; i++) {
        const mockBuffName: string = getUniqueString();
        for (let j = 0; j < 5; j++) {
            mockBuffDocuments.push(await new BuffModel({ name: mockBuffName, rank: j }).save());
        }
    }

    // Create and save a fake stat category
    const statCategoryFields: StatCategoryFields = { name: getUniqueString() };
    const statCategoryDocument: StatCategoryDocument = await new StatCategoryModel(statCategoryFields).save();

    //Create and save fake stat data.
    const mockStatDocuments: StatDocument[] = [];
    for (let i = 0; i < 10; i++) {
        const statValues: StatDocumentFields = { name: getUniqueString(), stat_category: statCategoryDocument._id };
        mockStatDocuments.push(await new statModel(statValues).save());
    }

    //Create and save mock BuffStatValue documents
    for (let i = 0; i < mockBuffDocuments.length; i++) {
        for (let j = 0; j < mockStatDocuments.length; j++) {
            const buffStatValueValues = {
                buff: mockBuffDocuments[i]._id,
                stat: mockStatDocuments[j]._id,
                value: Math.floor(Math.random() * 50)
            };
            await new BuffStatValue(buffStatValueValues).save();
        }
    }
});
afterAll(stopConnectionToTestDB);

test("addNewBuffStatValue() creates the correct buffStatValue when sent a request with valid query params", async () => {
    const buffValues: BuffFields = {
        name: getUniqueString(),
        rank: getUniqueNumber()
    }

    const statCategoryFields: StatCategoryFields = { name: getUniqueString() };
    const statCategoryDocument = await new StatCategoryModel(statCategoryFields);

    const statValues: StatDocumentFields = {
        name: getUniqueString(),
        stat_category: statCategoryDocument._id
    }

    const buffDoc = await new BuffModel(buffValues).save();
    const statDoc = await new statModel(statValues).save();

    const req: any = {
        query: {
            buff: buffDoc._id,
            stat: statDoc._id,
            value: 20
        }
    }

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    }

    const next = jest.fn();

    await new BuffStatValueController().addNewBuffStatValue(req, res, next);

    expect(res.json).toBeCalled();
    expect(next).not.toBeCalled();
});

test("addBuffStatValue() responds with an error when sent a request with empty params", async () => {

    const emptyRequest: any = {
        body: []
    };

    const res: any = {
        json: jest.fn()
    }

    const next = jest.fn();

    await new BuffStatValueController().addNewBuffStatValue(emptyRequest, res, next);

    expect(res.json).not.toBeCalled();
    expect(next).toBeCalled();
});

test("getBuffStatValue() returns the correct BuffStatValue when sent a request with valid params.", async () => {
    const storedBuffStatValue = await BuffStatValue.findOne().exec();

    if (storedBuffStatValue != null) {
        const req: any = {
            query: {
                buff: storedBuffStatValue.buff,
                stat: storedBuffStatValue.stat
            }
        }

        const resMockJsonFunction = jest.fn();
        const next = jest.fn();

        const res: any = {
            json: resMockJsonFunction,
            send: jest.fn()
        }

        await new BuffStatValueController().getBuffStatValue(req, res, next);

        expect(resMockJsonFunction).toBeCalledWith(storedBuffStatValue.toJSON());
    } else {
        expect(true).toBe(false);
    }
});

test("getBuffStatValue() responds with an error when sent a request with empty params", async () => {

    const req: any = {
        params: {}
    }

    const jsonFunction = jest.fn();
    const res: any = {
        json: jsonFunction
    }

    const buffStatValueController = new BuffStatValueController();
    const next = jest.fn();
    await buffStatValueController.getBuffStatValue(req, res, next);

    expect(jsonFunction).not.toBeCalled();
    expect(next).toBeCalled();
});


test("getBuffStatValue() responds with an error when sent a request without a buff in query params", async () => {

    const storedBuffStatValue = await BuffStatValue.findOne().exec();

    if (storedBuffStatValue != null) {
        const req: any = {
            params: {
                stat: storedBuffStatValue.stat
            }
        }

        const jsonFunction = jest.fn();
        const res: any = {
            json: jsonFunction
        }

        const buffStatValueController = new BuffStatValueController();
        const next = jest.fn();
        await buffStatValueController.getBuffStatValue(req, res, next);

        expect(jsonFunction).not.toBeCalled();
        expect(next).toBeCalled();
    } else {
        expect(true).toBe(false);
    }
});

test("getBuffStatValue() responds with an error when sent a request without a stat in query params", async () => {

    const storedBuffStatValue = await BuffStatValue.findOne().exec();

    if (storedBuffStatValue != null) {
        const req: any = {
            params: {
                buff: storedBuffStatValue.buff
            }
        }

        const jsonFunction = jest.fn();
        const res: any = {
            json: jsonFunction
        }

        const next = jest.fn();
        await new BuffStatValueController().getBuffStatValue(req, res, next);

        expect(jsonFunction).not.toBeCalled();
        expect(next).toBeCalled();
    } else {
        expect(true).toBe(false);
    }
});