// difference([1, 2, 3], [1, 2, 4]); // [3]
function difference(compareArray) {
    const s = new Set(compareArray);
    return this.filter(x => !s.has(x));
}
// differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
function differenceBy(compareArray, fn) {
    return difference(compareArray.map(v => fn(v)));
}

export { difference, differenceBy }