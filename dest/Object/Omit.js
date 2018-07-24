"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function omit(arr) {
    Object.keys(this)
        .filter(k => !arr.includes(k))
        .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}
exports.omit = omit;
function omitBy(fn) {
    Object.keys(this)
        .filter(k => !fn(this[k], k))
        .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}
exports.omitBy = omitBy;
