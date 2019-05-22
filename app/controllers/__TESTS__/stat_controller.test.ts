import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { statModel } from "../../models/stat";
import { StatController } from "../stat_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("Creating a stat makes the correct stat based on the request", async () => {

    const statName: string = "Spirit";

    const req: any = {
        query: {
            name: statName
        },
    };

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    };

    expect(await statModel.findOne()).toBeNull();

    const statController = new StatController();

    await statController.createStat(req, res);

    expect(res.json).toBeCalled();
    expect(res.send).not.toBeCalled();

    const createdStat: any = await statModel.findOne().exec();
    expect(createdStat.name).toEqual(statName);
});