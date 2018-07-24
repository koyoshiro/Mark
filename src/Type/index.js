function isEmpty() {
        return this == null || !(Object.keys(this) || this).length;
}

function isNull() {
        return this === undefined || this === null;
}

function isValid() {
        return isEmpty() || isNull();
}

export { isEmpty, isNull, isValid };
