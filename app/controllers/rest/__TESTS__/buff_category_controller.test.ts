import { BuffCategoryFields, BuffCategoryModel } from "../../../models/buff_category";
import { startConnectionToTestDB, stopConnectionToTestDB } from "../../../test_utils/connection_utils";
import { BuffCategoryController } from "../buff_category_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("That BuffCategoryController.getBuffCategory() returns the correct BuffCategory with correct query params.", async () => {

    const buffCategoryValues: BuffCategoryFields = {
        name: "Mock Buff category name for buff category controller test."
    };

    const buffCategory = await new BuffCategoryModel(buffCategoryValues).save();

    const req: any = { query: { _id: buffCategory._id } };
    const res: any = {
        send: jest.fn()
    };

    const buffCategoryController = new BuffCategoryController();

    await buffCategoryController.getBuffCategory(req, res, jest.fn());

    expect(res.send).toBeCalledWith({ name: buffCategoryValues.name, _id: buffCategory._id, __v: buffCategory.__v });
});

test("That BuffCategoryController.createBuffCategory() creates a BuffCategory with the correct name.", async () => {
    const buffCategoryValues: BuffCategoryFields = {
        name: "Mock Buff Category name for BuffCategoryController.createBuffCategory() positive test."
    };

    const preCreatedBuffCategory = await BuffCategoryModel.findOne(buffCategoryValues).exec();
    expect(preCreatedBuffCategory).toBeNull();

    const req: any = { query: buffCategoryValues };
    const res: any = {
        send: jest.fn()
    }

    const buffCategoryController = new BuffCategoryController();

    await buffCategoryController.createBuffCategory(req, res, jest.fn());
    const buffCategoryPostRequest = await BuffCategoryModel.findOne(buffCategoryValues).exec();

    expect(buffCategoryPostRequest).not.toBeNull();
    if (buffCategoryPostRequest) {
        expect(buffCategoryPostRequest.name).toEqual(buffCategoryValues.name);
    }
});
