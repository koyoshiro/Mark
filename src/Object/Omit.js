function omit(arr) {
        Object.keys(this)
                .filter(k => !arr.includes(k))
                .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}

function omitBy(fn) {
        Object.keys(this)
                .filter(k => !fn(this[k], k))
                .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}

export { omit, omitBy };
