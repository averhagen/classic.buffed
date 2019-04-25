"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var connection_utils = __importStar(require("../../test_utils/connection_utils"));
var buff_1 = require("../buff");
beforeAll(connection_utils.startConnectionToTestDB);
afterAll(connection_utils.stopConnectionToTestDB);
connection_utils.testConnectionIsValid();
test("That saving a Buff without a name throws an error.", function () { return __awaiter(_this, void 0, void 0, function () {
    var docWithoutNameAttribute, buffDocument;
    return __generator(this, function (_a) {
        docWithoutNameAttribute = { rank: 2 };
        buffDocument = new buff_1.BuffModel(docWithoutNameAttribute);
        expect(buffDocument.save()).rejects.not.toBeNull();
        return [2 /*return*/];
    });
}); });
test("That saving a Buff without a Rank throws an error.", function () { return __awaiter(_this, void 0, void 0, function () {
    var docWithoutRankAttribute, buffDocument;
    return __generator(this, function (_a) {
        docWithoutRankAttribute = { name: "Buff Without a rank" };
        buffDocument = new buff_1.BuffModel(docWithoutRankAttribute);
        expect(buffDocument.save()).rejects.not.toBeNull();
        return [2 /*return*/];
    });
}); });
test("That saving a Buff without a Rank or Name throws an error", function () { return __awaiter(_this, void 0, void 0, function () {
    var docWithoutRankOrBuffAttribute, buffDocument;
    return __generator(this, function (_a) {
        docWithoutRankOrBuffAttribute = {};
        buffDocument = new buff_1.BuffModel(docWithoutRankOrBuffAttribute);
        expect(buffDocument.save()).rejects.not.toBeNull();
        return [2 /*return*/];
    });
}); });
test("That valid buff is saved with the proper values.", function () { return __awaiter(_this, void 0, void 0, function () {
    var buffName, buffRank, docWithBuffValues, savedBuff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                buffName = "Divine Spirit";
                buffRank = 1;
                docWithBuffValues = { name: buffName, rank: buffRank };
                return [4 /*yield*/, new buff_1.BuffModel(docWithBuffValues).save()];
            case 1:
                savedBuff = _a.sent();
                expect(savedBuff.name).toBe(buffName);
                expect(savedBuff.rank).toBe(buffRank);
                return [2 /*return*/];
        }
    });
}); });
