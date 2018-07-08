"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const All_js_1 = require("./All.js");
function arrayExpansion() {
    Array.prototype.all = All_js_1.all.bind(this);
}
exports.arrayExpansion = arrayExpansion;
;
