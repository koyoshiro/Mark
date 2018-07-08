// remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
function remove(fn) {
    return this.filter(fn).reduce((acc, val) => {
        this.splice(this.indexOf(val), 1);
        return acc.concat(val);
    }, [])
}

export { remove }