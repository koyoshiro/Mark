"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("./Array");
Array_1.arrayExpansion();
const testA = [1, 2, 3, 4];
const result = testA.all(x => x > 1);
console.log(result);
