"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tomorrow() {
    let t = this;
    t.setDate(t.getDate() + 1);
    const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    return ret;
}
exports.tomorrow = tomorrow;
