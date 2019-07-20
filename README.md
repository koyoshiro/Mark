## Mark

ES6 扩展方法集

## 使用

```bash
"mark": "git+https://github.com/koyoshiro/Mark.git#master"
```

## 说明

### Array

<details>
<summary>View contents</summary>

- [`all`](#all)
- [`any`](#any)
- [`min`](#min)
- [`max`](#max)
- [`count`](#count)
- [`difference`](#difference)
- [`drop`](#drop)
- [`dropRight`](#dropRight)
- [`flatten`](#flatten)
- [`intersection`](#intersection)
- [`union`](#union)
- [`groupBy`](#droprightwhile)
- [`pull`](#pull)
- [`reduceFilter`](#reducefilter)
- [`remove`](#remove)
- [`unique`](#unique)
- [`isEmpty`](#isempty)
- [`isNull`](#isnull)
- [`isValid`](#isvalid)

</details>

### Boolean

<details>
<summary>View contents</summary>

- [`isEmpty`](#isempty)
- [`isNull`](#isnull)
- [`isValid`](#isvalid)

</details>

### Date

<details>
<summary>View contents</summary>

- [`betweenDate`](#betweendate)
- [`format`](#format)
- [`tomorrow`](#tomorrow)

</details>

### Object

<details>
<summary>View contents</summary>

- [`equals`](#equals)
- [`findKey`](#findKey)
- [`omit`](#omit)
- [`omitBy`](#omitby)
- [`pick`](#pick)
- [`pickBy`](#pickby)
- [`isEmpty`](#isempty)
- [`isNull`](#isnull)
- [`isValid`](#isvalid)

</details>

### String

<details>
<summary>View contents</summary>

- [`mask`](#mask)
- [`convertToCamel`](#converttocamel)
- [`isEmpty`](#isempty)
- [`isNull`](#isnull)
- [`isValid`](#isvalid)

</details>

---

## Array

### all

```js
[2, 3, 4].all(x => {
        x > 1;
}); // true
```

### any

```js
[2, 3, 4].any(x => {
        x > 3;
}); // true
```

### max

```js
[2, 3, 4].max(2); // [3,4]
```

### min

```js
[2, 3, 4].min(2); // [2,3]
```

### count

```js
[1, 2, 3, 4, 4, 3, 2, 2].count(2); // 3
```

### difference

```js
[1, 2, 3].difference([1, 3, 4]); // [2,4]
```

### drop

```js
[1, 2, 3].drop(2); // [3]
```

### dropRight

```js
[1, 2, 3].dropRight(2); // [1]
```

### flatten

```js
[1, [2], [[3], 4]].flatten(); // [1,2,3,4]
```

### intersection

```js
[1, 2, 3].intersection([3, 4, 5]); // [3]
```

### union

```js
[1, 2, 3].union([3, 4, 5]); // [1,2,3,4,5]
```

### groupBy

```js
[{ key: A, val: 1 }, { key: A, val: 2 }, { key: B, val: 3 }].groupBy("key"); // {A:[{key:A,val:1},{key:A,val:2}],B:[{key:B,val:3}]}
```

### pull

```js
[1, 2, 3, 4, 5].pull("1", "2"); // [3,4,5]
```

### reduceFilter

```js
[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }].reduceFilter("x", x => {
        x > 2;
}); // [{ x: 3 }]
```

### remove

```js
[1, 2, 3, 4].remove("x", x => {
        x > 2;
}); // [3,4]
```

### unique

```js
[1, 2, 3, 4, 1, 2, 3, 4].unique(); // [1,2,3,4]
```

<br>[⬆ 返回](#说明)

---

## Date

### betweenDate

```js
new Date("2018-08-05").betweenDate(new Date("2018-11-20")); // 109
```

### format

```js
new Date().format("yyyy-MM-dd hh:mm:ss.S"); // 2016-07-02 08:09:04.423
```

### tomorrow

```js
new Date().tomorrow(); // 2018-07-27
```

<br>[⬆ 返回](#说明)

---

## Object

### equals

```js
{ a: [2, { e: 3 }], b: [4], c: 'woo' }.equals({ a: [2, { e: 3 }], b: [4], c: 'woo' }); // true
```

### findKey

```js
{
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  }.findKey((o)=>o['active']); // 'barney'
```

### omit

```js
{ a: 1, b: '2', c: 3 }.omit(['b']); // { 'a': 1, 'c': 3 }
```

### omitBy

```js
{ a: 1, b: '2', c: 3 }.omitBy((x) => { return typeof x === 'number'}); // { b: '2' }
```

### pick

```js
{ a: 1, b: '2', c: 3 }.pick(['a', 'c']); // { 'a': 1, 'c': 3 }
```

### pickBy

```js
{ a: 1, b: '2', c: 3 }.pickBy((x)=> { return typeof x === 'number'}); // { 'a': 1, 'c': 3 }
```

<br>[⬆ 返回](#说明)

---

## String

### mask
```js
1234567890.mask(); // '******7890'
1234567890.mask(3); // '*******890'
1234567890.mask(-4, '$'); // '$$$$567890'
```

### convertToCamel

```js
'some_database_field_name'.toCamelCase(); // 'someDatabaseFieldName'
```

<br>[⬆ 返回](#说明)

---

## Common

### isEmpty

```js
//伪代码
[].isEmpty(); // true
{}.isEmpty(); // true
''.isEmpty(); // true
true.isEmpty(); // true
```

### isNull

```js
//伪代码
[].isNull(); // false
{}.isNull(); // false
''.isNull(); // false
true.isNull(); // false
undefined.isNull(); // false
null.isNull(); // true
```

### isValid

```js
//伪代码
[].isValid(); // false
{}.isValid(); // false
''.isValid(); // false
true.isValid(); // false
undefined.isValid(); // false
null.isValid(); // false
```

<br>[⬆ 返回](#说明)

# Todo
- [ ] publish npm package
- [ ] support single/multiple cases
- [ ] optimized/fix code
- [ ] support single/multiple cases
