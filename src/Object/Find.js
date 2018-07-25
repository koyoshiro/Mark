function findKey(fn) {
        Object.keys(this).find(key => fn(this[key], key, this));
}

export { findKey };