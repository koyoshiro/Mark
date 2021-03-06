"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// flatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
function flatten() {
    return [].concat(...this.map(v => (Array.isArray(v) ? flatten(v) : v)));
}
exports.flatten = flatten;
