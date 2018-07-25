"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Equals_1 = require("./Equals");
const Find_1 = require("./Find");
const Omit_1 = require("./Omit");
const Pick_1 = require("./Pick");
const index_1 = require("../Type/index");
function objectExpansion() {
    Object.prototype.equals = Equals_1.equals;
    Object.prototype.findKey = Find_1.findKey;
    Object.prototype.omit = Omit_1.omit;
    Object.prototype.omitBy = Omit_1.omitBy;
    Object.prototype.pick = Pick_1.pick;
    Object.prototype.pickBy = Pick_1.pickBy;
    Object.prototype.isEmpty = index_1.isEmpty;
    Object.prototype.isNull = index_1.isNull;
    Object.prototype.isValid = index_1.isValid;
}
exports.objectExpansion = objectExpansion;
