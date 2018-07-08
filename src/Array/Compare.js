// max([1, 2, 3], 2); // [3,2]
function max(maxCount = 1) {
    return [...this].sort((a, b) => b - a).slice(0, maxCount);
}

// min([1, 2, 3], 2); // [1,2]
function min(minCount = 1) {
    return [...this].sort((a, b) => a - b).slice(0, minCount);
}

export { max, min }