"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findKey(fn) {
    Object.keys(this).find(key => fn(this[key], key, this));
}
exports.findKey = findKey;
