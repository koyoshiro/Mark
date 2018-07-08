"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
// pull(myArray, 'a', 'c'); // myArray = [ 'b', 'b' ]
function pull(...args) {
    let argState = Array.isArray(args[0]) ? args[0] : args;
    let pulled = this.filter((v, i) => !argState.includes(v));
    this.length = 0;
    pulled.forEach(v => this.push(v));
    return this;
}
exports.pull = pull;
// var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
// pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x); // myArray = [{ x: 2 }]
function pullBy(minCount = 1) {
    const length = args.length;
    let fn = length > 1 ? args[length - 1] : undefined;
    fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
    let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
    let pulled = this.filter((v, i) => !argState.includes(fn(v)));
    this.length = 0;
    pulled.forEach(v => this.push(v));
    return this;
}
exports.pullBy = pullBy;
