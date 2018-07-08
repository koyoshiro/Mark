// any([0, 1, 2, 0], x => x >= 2); // true
function any(fn) {
    return this.some(fn);
}
export { any }