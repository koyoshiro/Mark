"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mask(num = 4, mask = "*") {
    ("" + this).slice(0, -num).replace(/./g, mask) +
        ("" + this).slice(-num);
}
exports.mask = mask;
