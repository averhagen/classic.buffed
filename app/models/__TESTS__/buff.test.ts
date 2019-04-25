import * as connection_utils from "../../../test_env/utils/connection_utils";
import { BuffModel, BuffDocument } from "../buff";

beforeAll(connection_utils.startConnectionToTestDB);

afterAll(connection_utils.stopConnectionToTestDB);

connection_utils.testConnectionIsValid();

test("That saving a Buff without a name throws an error.", async () => {
    const docWithoutNameAttribute = { rank: 2 };
    const abc = new BuffModel(docWithoutNameAttribute);
    expect(abc.save()).rejects.not.toBeNull();
});