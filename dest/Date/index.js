"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Format_1 = require("./Format");
const BetweenDate_1 = require("./BetweenDate");
const Tomorrow_1 = require("./Tomorrow");
const index_1 = require("../Type/index");
function dateExpansion() {
    Date.prototype.format = Format_1.format;
    Date.prototype.betweenDate = BetweenDate_1.betweenDate;
    Date.prototype.tomorrow = Tomorrow_1.tomorrow;
    Date.prototype.isEmpty = index_1.isEmpty;
    Date.prototype.isNull = index_1.isNull;
    Date.prototype.isValid = index_1.isValid;
}
exports.dateExpansion = dateExpansion;
;
