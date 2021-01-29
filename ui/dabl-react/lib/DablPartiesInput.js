"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var JwtTokens_1 = require("./JwtTokens");
function isPartyDetails(partyDetails) {
    return typeof partyDetails.ledgerId === 'string' &&
        typeof partyDetails.owner === 'string' &&
        typeof partyDetails.party === 'string' &&
        typeof partyDetails.partyName === 'string' &&
        typeof partyDetails.token === 'string';
}
function isParties(parties) {
    if (parties instanceof Array) {
        // True if any element of the array is not a PartyDetails
        var invalidPartyDetail = parties.reduce(function (invalid, party) { return invalid || !isPartyDetails(party); }, false);
        return !invalidPartyDetail;
    }
    else {
        return false;
    }
}
var PartyErrors;
(function (PartyErrors) {
    PartyErrors[PartyErrors["InvalidPartiesError"] = 0] = "InvalidPartiesError";
    PartyErrors[PartyErrors["InvalidPartyDetailError"] = 1] = "InvalidPartyDetailError";
    PartyErrors[PartyErrors["LedgerMismatchError"] = 2] = "LedgerMismatchError";
    PartyErrors[PartyErrors["ExpiredTokenError"] = 3] = "ExpiredTokenError";
})(PartyErrors || (PartyErrors = {}));
var InvalidPartiesError = /** @class */ (function (_super) {
    __extends(InvalidPartiesError, _super);
    function InvalidPartiesError(message, type) {
        var _this = _super.call(this, message) || this;
        _this.type = type;
        return _this;
    }
    return InvalidPartiesError;
}(Error));
;
function validateParties(parties, ledgerId) {
    var _a;
    // True if any ledgerIds do not match the app's deployed ledger Id
    var invalidLedger = parties.reduce(function (valid, party) { return valid || (party.ledgerId !== ledgerId); }, false);
    // True if any token is expired
    var invalidTokens = parties.reduce(function (valid, party) { return valid || JwtTokens_1.expiredToken(party.token); }, false);
    if (invalidLedger) {
        var fileLedgerId = (_a = parties.find(function (p) { return p.ledgerId !== ledgerId; })) === null || _a === void 0 ? void 0 : _a.ledgerId;
        var errMessage = "Your parties.json file is for a different ledger! File uses ledger " + fileLedgerId + " but app is running on ledger " + ledgerId;
        throw new InvalidPartiesError(errMessage, PartyErrors.LedgerMismatchError);
    }
    if (invalidTokens) {
        throw new InvalidPartiesError('Your parties.json file contains expired tokens!', PartyErrors.ExpiredTokenError);
    }
}
function convertPartiesJson(partiesJson, ledgerId, validateFile) {
    if (validateFile === void 0) { validateFile = true; }
    try {
        var parsed = JSON.parse(partiesJson);
        if (validateFile) {
            if (!isParties(parsed)) {
                throw new InvalidPartiesError('Format does not look like parties.json', PartyErrors.InvalidPartyDetailError);
            }
            validateParties(parsed, ledgerId);
        }
        return [parsed, undefined];
    }
    catch (err) {
        var message = 'Not a valid JSON file.';
        if (!!err.type) {
            message = err.message;
        }
        return [undefined, message];
    }
}
exports.convertPartiesJson = convertPartiesJson;
exports.DablPartiesInput = function (_a) {
    var ledgerId = _a.ledgerId, partiesJson = _a.partiesJson, _b = _a.validateFile, validateFile = _b === void 0 ? true : _b, onError = _a.onError, onLoad = _a.onLoad;
    var _c = react_1.default.useState(), parties = _c[0], setParties = _c[1];
    var _d = react_1.default.useState(), error = _d[0], setError = _d[1];
    react_1.default.useEffect(function () {
        if (partiesJson) {
            var _a = convertPartiesJson(partiesJson, ledgerId, validateFile), parties_1 = _a[0], error_1 = _a[1];
            if (parties_1) {
                setParties(parties_1);
            }
            if (error_1) {
                setError(error_1);
            }
        }
    }, [partiesJson, ledgerId, validateFile]);
    react_1.default.useEffect(function () {
        if (parties) {
            onLoad(parties);
        }
    }, [parties]);
    react_1.default.useEffect(function () {
        if (error) {
            onError(error);
        }
    }, [error]);
    var handleFileUpload = function (contents) {
        var _a = convertPartiesJson(contents, ledgerId, validateFile), parties = _a[0], error = _a[1];
        if (parties) {
            setParties(parties);
        }
        if (error) {
            setError(error);
        }
    };
    return (react_1.default.createElement("input", { type: 'file', value: '', onChange: function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && typeof event.target.result === 'string') {
                    handleFileUpload(event.target.result);
                }
            };
            if (e.target && e.target.files) {
                reader.readAsText(e.target.files[0]);
            }
        } }));
};
//# sourceMappingURL=DablPartiesInput.js.map