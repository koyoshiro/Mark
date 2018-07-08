// const data = [
//     {
//       id: 1,
//       name: 'john',
//       age: 24
//     },
//     {
//       id: 2,
//       name: 'mike',
//       age: 50
//     }
//   ];
//   reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
function reduceFilter(key, fn) {
    return this.filter(fn).map(el =>
        keys.reduce((acc, key) => {
            acc[key] = el[key];
            return acc;
        }, {})
    );
}

export { reduceFilter }