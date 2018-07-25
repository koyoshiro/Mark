"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mask_1 = require("./Mask");
const Convert_1 = require("./Convert");
const index_1 = require("../Type/index");
function stringExpansion() {
    String.prototype.mask = Mask_1.mask;
    String.prototype.convertToCamel = Convert_1.convertToCamel;
    String.prototype.isEmpty = index_1.isEmpty;
    String.prototype.isNull = index_1.isNull;
    String.prototype.isValid = index_1.isValid;
}
exports.stringExpansion = stringExpansion;
