function pick(obj, arr) {
        return arr.reduce(
                (acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc),
                {}
        );
}

function pickBy(obj, fn) {
        return Object.keys(obj)
                .filter(k => fn(obj[k], k))
                .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}

export { pick, pickBy };
