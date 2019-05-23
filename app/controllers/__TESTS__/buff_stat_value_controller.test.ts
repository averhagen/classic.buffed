import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";
import { BuffStatValue } from "../../models/buff_stat_value";
import { BuffStatValueController } from "../buff_stat_value_controller";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);

test("addNewBuffStatValue method creates the correct buffStatValue.", async () => {

});