"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../Type/index");
function booleanExpansion() {
    Boolean.prototype.isEmpty = index_1.isEmpty;
    Boolean.prototype.isNull = index_1.isNull;
    Boolean.prototype.isValid = index_1.isValid;
}
exports.booleanExpansion = booleanExpansion;
