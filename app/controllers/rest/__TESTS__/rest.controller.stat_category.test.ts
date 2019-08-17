import * as test_utils from "../../../test_utils/connection_utils";
import { RestControllerStatCategory } from "../rest.controller.stat_category";

beforeAll(test_utils.startConnectionToTestDB);
afterAll(test_utils.stopConnectionToTestDB);

test_utils.testConnectionIsValid();

test("RestControllerStatCategory.createStatCategory() fails to create a stat when sent a request without query params.", async () => {
    const req: any = {
        query: {}
    };

    const res: any = {

    };

    const nextFunction = jest.fn();
    new RestControllerStatCategory().createStatCategory(req, res, nextFunction);
    expect(nextFunction).toBeCalled();
});