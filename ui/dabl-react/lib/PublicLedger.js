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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@daml/react");
function publicPartyEndPoint(ledgerId, hostname) {
    return hostname + "/api/ledger/" + ledgerId + "/public/token";
}
function fetchPublicPartyToken(ledgerId, httpBaseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var hostname, response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    hostname = new URL(httpBaseUrl || 'https://api.projectdabl.com').hostname;
                    return [4 /*yield*/, fetch('//' + publicPartyEndPoint(ledgerId, hostname), { method: "POST" })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, 'access_token' in json ? json.access_token : null];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching public party token " + JSON.stringify(error_1));
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var _a = react_2.createLedgerContext(), DamlLedger = _a.DamlLedger, useParty = _a.useParty, useLedger = _a.useLedger, useQuery = _a.useQuery, useFetchByKey = _a.useFetchByKey, useStreamQuery = _a.useStreamQuery, useStreamQueries = _a.useStreamQueries, useStreamFetchByKey = _a.useStreamFetchByKey, useStreamFetchByKeys = _a.useStreamFetchByKeys, useReload = _a.useReload;
function PublicLedger(_a) {
    var ledgerId = _a.ledgerId, publicParty = _a.publicParty, httpBaseUrl = _a.httpBaseUrl, wsBaseUrl = _a.wsBaseUrl, defaultToken = _a.defaultToken, reconnectThreshold = _a.reconnectThreshold, children = _a.children;
    var _b = react_1.useState(defaultToken), publicToken = _b[0], setPublicToken = _b[1];
    react_1.useEffect(function () {
        function res() {
            return __awaiter(this, void 0, void 0, function () {
                var pt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetchPublicPartyToken(ledgerId, httpBaseUrl)];
                        case 1:
                            pt = _a.sent();
                            console.log("The fetched publicToken " + JSON.stringify(pt));
                            if (pt !== null) {
                                setPublicToken(pt);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        ;
        res();
    }, []);
    if (publicToken === undefined) {
        return null;
    }
    else {
        return react_1.createElement(DamlLedger, { party: publicParty, token: publicToken, httpBaseUrl: httpBaseUrl, wsBaseUrl: wsBaseUrl, reconnectThreshold: reconnectThreshold }, children);
    }
}
exports.PublicLedger = PublicLedger;
exports.usePartyAsPublic = useParty;
exports.useLedgerAsPublic = useLedger;
function useQueryAsPublic(template, queryFactory, queryDeps) {
    return useQuery(template, queryFactory, queryDeps);
}
exports.useQueryAsPublic = useQueryAsPublic;
function useFetchByKeyAsPublic(template, keyFactory, keyDeps) {
    return useFetchByKey(template, keyFactory, keyDeps);
}
exports.useFetchByKeyAsPublic = useFetchByKeyAsPublic;
function useStreamQueryAsPublic(template, queryFactory, queryDeps, closeHandler) {
    return useStreamQuery(template, queryFactory, queryDeps, closeHandler);
}
exports.useStreamQueryAsPublic = useStreamQueryAsPublic;
function useStreamQueriesAsPublic(template, queryFactory, queryDeps, closeHandler) {
    return useStreamQueries(template, queryFactory, queryDeps, closeHandler);
}
exports.useStreamQueriesAsPublic = useStreamQueriesAsPublic;
/**
 * React Hook to query the ledger. Same as useStreamQueryAsPublic, but query by contract key instead.
 *
 * @deprecated prefer useStreamFetchByKeysAsPublic
 *
 * @typeparam T The contract template type of the query.
 * @typeparam K The contract key type of the query.
 * @typeparam I The template id type.
 *
 * @param template The template of the contracts to match.
 * @param queryFactory A function returning a contract key.
 * @param queryDeps The dependencies of the query (for which a change triggers an update of the result).
 * @param closeHandler A callback that will be called if the underlying WebSocket connection fails in an unrecoverable way.
 *
 * @return The matching (unique) contract, or null.
 */
function useStreamFetchByKeyAsPublic(template, keyFactory, keyDeps, closeHandler) {
    return useStreamFetchByKey(template, keyFactory, keyDeps, closeHandler);
}
exports.useStreamFetchByKeyAsPublic = useStreamFetchByKeyAsPublic;
function useStreamFetchByKeysAsPublic(template, keyFactory, keyDeps, closeHandler) {
    return useStreamFetchByKeys(template, keyFactory, keyDeps, closeHandler);
}
exports.useStreamFetchByKeysAsPublic = useStreamFetchByKeysAsPublic;
exports.useReloadAsPublic = useReload;
//# sourceMappingURL=PublicLedger.js.map