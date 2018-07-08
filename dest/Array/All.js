"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// all([4, 2, 3], x => x > 1); // true
function all(fn) {
    return this.every(fn);
}
exports.all = all;
