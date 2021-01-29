/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var json_type_validation_1 = require("@mojotech/json-type-validation");
var wellKnownPartiesDecoder = json_type_validation_1.object({
    userAdminParty: json_type_validation_1.string(),
    publicParty: json_type_validation_1.string(),
});
function wellKnownEndPoint() {
    var url = window.location.host;
    if (!url.endsWith('projectdabl.com')) {
        console.warn("Passed url " + url + " does not point to projectdabl.com");
    }
    return url + '/.well-known/dabl.json';
}
function fetchWellKnownParties() {
    return __awaiter(this, void 0, void 0, function () {
        var response, dablJson, parties, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('//' + wellKnownEndPoint())];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    dablJson = _a.sent();
                    parties = wellKnownPartiesDecoder.runWithException(dablJson);
                    return [2 /*return*/, { parties: parties, loading: false, error: null }];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error determining well known parties " + JSON.stringify(error_1));
                    return [2 /*return*/, { parties: null, loading: false, error: error_1 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// This empty default context value does not escape outside of the provider.
var WellKnownPartiesContext = react_1.createContext(undefined);
/**
 * A React context within which you can use the [[useWellKnowParties]] hook.
 *
 * @param defaultWkp An optional [[WellKnownParties]] that will be returned if the fetch fails.
 */
function WellKnownPartiesProvider(_a) {
    var defaultWkp = _a.defaultWkp, children = _a.children;
    var _b = react_1.useState({
        parties: defaultWkp || null,
        loading: true,
        error: null
    }), wellKnownParties = _b[0], setWKP = _b[1];
    react_1.useEffect(function () {
        function res() {
            return __awaiter(this, void 0, void 0, function () {
                var wkp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setWKP({
                                parties: (wellKnownParties === null || wellKnownParties === void 0 ? void 0 : wellKnownParties.parties) || null,
                                loading: true,
                                error: null
                            });
                            return [4 /*yield*/, fetchWellKnownParties()];
                        case 1:
                            wkp = _a.sent();
                            console.log("The fetched well known parties: " + JSON.stringify(wkp));
                            setWKP(wkp);
                            return [2 /*return*/];
                    }
                });
            });
        }
        ;
        res();
    }, []);
    if (wellKnownParties === undefined) {
        return null;
    }
    else {
        return react_1.default.createElement(WellKnownPartiesContext.Provider, { value: wellKnownParties }, children);
    }
}
exports.WellKnownPartiesProvider = WellKnownPartiesProvider;
/**
 * React hook the Well Known parties.
 */
function useWellKnownParties() {
    var wkp = react_1.default.useContext(WellKnownPartiesContext);
    if (wkp === undefined) {
        throw new Error("useWellKnownParties must be within WellKnownPartiesContext Provider");
    }
    return wkp;
}
exports.useWellKnownParties = useWellKnownParties;
//# sourceMappingURL=WellKnownParties.js.map