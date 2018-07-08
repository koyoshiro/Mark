// drop([1, 2, 3], 2); // [3]
function drop(removeCount = 1) {
    return this.slice(removeCount);
}
// dropRight([1, 2, 3], 2); // [1]
function dropRight(removeCount = 1) {
    return this.slice(0, -removeCount);
}

export { drop, dropRight }