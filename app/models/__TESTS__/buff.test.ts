import * as connection_utils from "../../../test_env/utils/connection_utils";

beforeAll(connection_utils.startConnectionToTestDB);

afterAll(connection_utils.stopConnectionToTestDB);

connection_utils.testConnectionIsValid();