import { startConnectionToTestDB, stopConnectionToTestDB } from "../../test_utils/connection_utils";

beforeAll(startConnectionToTestDB);
afterAll(stopConnectionToTestDB);