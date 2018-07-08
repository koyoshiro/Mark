// all([4, 2, 3], x => x > 1); // true
function all(fn) {
    return this.every(fn);
}
export { all }