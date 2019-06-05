import { BuffModel } from "../../models/buff";
import { statModel } from "../../models/stat";
import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { BuffStatValueController } from "../buff_stat_value_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("addNewBuffStatValue method creates the correct buffStatValue.", async () => {
    const buffValues = {
        name: "buff_stat_value buff name test",
        rank: 0
    }

    const statValues = {
        name: "buff_stat_value controller test mock stat name",
    }

    const buffDoc = await new BuffModel(buffValues).save();
    const statDoc = await new statModel(statValues).save();

    const req: any = {
        body: {
            buff: buffDoc._id,
            stat: statDoc._id,
            value: 20
        }
    }

    const res: any = {
        json: jest.fn(),
        send: jest.fn()
    }

    await new BuffStatValueController().addNewBuffStatValue(req, res);

    expect(res.json).toBeCalled();
});

test("getBuffStatValue method returns the correct BuffStatValue with the correct params.", async () => {
    const mockBuffValues = {
        name: "getBuffStatValue test buff name",
        rank: 2
    }
    const buff = await new BuffModel(mockBuffValues).save();

    const mockStatValues = {
        name: "getBuffStatValue test buff name"
    }
    const stat = await new statModel(mockStatValues).save();
});