function findKey(fn) {
       return Object.keys(this).find(key => fn(this[key], key, this));
}

export { findKey };