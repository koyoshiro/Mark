function omit(arr) {
        return Object.keys(this)
                .filter(k => !arr.includes(k))
                .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}

function omitBy(fn) {
        return Object.keys(this)
                .filter(k => !fn(this[k], k))
                .reduce((acc, key) => ((acc[key] = this[key]), acc), {});
}

export { omit, omitBy };
