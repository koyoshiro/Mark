"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Format_1 = require("./Format");
const BetweenDate_1 = require("./BetweenDate");
const Tomorrow_1 = require("./Tomorrow");
function dateExpansion() {
    Date.prototype.format = Format_1.format;
    Date.prototype.betweenDate = BetweenDate_1.betweenDate;
    Date.prototype.tomorrow = Tomorrow_1.tomorrow;
}
exports.dateExpansion = dateExpansion;
;
