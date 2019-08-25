import { StatCategoryFields, StatCategoryModel } from "../../../models/stat_category";
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

test("That RestControllerStatCategory.createStatCategory() creates a StatCategory with the correct name.", async () => {
    const statCategoryValues: StatCategoryFields = {
        name: "Mock Stat Category name for RestControllerStatCategory.createStatCategory() positive test."
    };

    const preCreatedStatCategory = await StatCategoryModel.findOne(statCategoryValues).exec();
    expect(preCreatedStatCategory).toBeNull();

    const req: any = { query: statCategoryValues };
    const res: any = {
        send: jest.fn()
    }

    const statCategoryController = new RestControllerStatCategory();

    await statCategoryController.createStatCategory(req, res, jest.fn());
    const statCategoryPostRequest = await StatCategoryModel.findOne(statCategoryValues).exec();

    expect(statCategoryPostRequest).not.toBeNull();
    if (statCategoryPostRequest) {
        expect(statCategoryPostRequest.name).toEqual(statCategoryValues.name);
    }
});