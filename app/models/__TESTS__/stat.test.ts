import * as connection_utils from "../../test_utils/connection_utils";
import { statModel } from "../stat";

beforeAll(async () => { await connection_utils.startConnectionToTestDB(); });

afterAll(async () => { await connection_utils.stopConnectionToTestDB(); });

connection_utils.testConnectionIsValid();