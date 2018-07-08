"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// unique([1, 2, 2, 3, 4, 4, 5]); // [1,2,3,4,5]
function unique() {
    return [...new Set(this)];
}
exports.unique = unique;
