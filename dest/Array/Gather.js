"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// intersection([1, 2, 3], [4, 3, 2]); // [2,3]
function intersection(compareArray) {
    const s = new Set(compareArray);
    return this.filter(x => s.has(x));
}
exports.intersection = intersection;
// union([1, 2, 3], [4, 3, 2]); // [1,2,3,4,3,2]
function union(unionArray) {
    return Array.from(new Set([...this, ...unionArray]));
}
exports.union = union;
