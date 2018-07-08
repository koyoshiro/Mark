// groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
function groupBy(fn) {
    return this.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
    }, {});
}

export { groupBy }