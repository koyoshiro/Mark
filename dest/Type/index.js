"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty() {
    return this == null || !(Object.keys(this) || this).length;
}
exports.isEmpty = isEmpty;
function isNull() {
    return this === undefined || this === null;
}
exports.isNull = isNull;
function isValid() {
    return isEmpty() || isNull();
}
exports.isValid = isValid;
