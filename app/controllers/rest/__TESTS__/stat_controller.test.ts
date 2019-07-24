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