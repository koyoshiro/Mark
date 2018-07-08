"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// drop([1, 2, 3], 2); // [3]
function drop(removeCount = 1) {
    return this.slice(removeCount);
}
exports.drop = drop;
// dropRight([1, 2, 3], 2); // [1]
function dropRight(removeCount = 1) {
    return this.slice(0, -removeCount);
}
exports.dropRight = dropRight;
