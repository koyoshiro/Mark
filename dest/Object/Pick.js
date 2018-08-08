"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pick(obj, arr) {
    return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
}
exports.pick = pick;
function pickBy(obj, fn) {
    return Object.keys(obj)
        .filter(k => fn(obj[k], k))
        .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}
exports.pickBy = pickBy;
