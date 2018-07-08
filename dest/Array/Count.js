"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  count([1, 1, 2, 1, 2, 3], 1); // 3
function count(value) {
    return this.reduce((a, v) => (v === value ? a + 1 : a), 0);
}
exports.count = count;
