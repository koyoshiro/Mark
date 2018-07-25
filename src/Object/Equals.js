function equals(compareObj) {
        const sampleObj = this;
        if (sampleObj === compareObj) return true;
        if (sampleObj instanceof Date && compareObj instanceof Date)
                return sampleObj.getTime() === compareObj.getTime();
        if (
                !sampleObj ||
                !compareObj ||
                (typeof sampleObj !== "object" &&
                        typeof compareObj !== "object")
        )
                return sampleObj === compareObj;
        if (
                sampleObj === null ||
                sampleObj === undefined ||
                compareObj === null ||
                compareObj === undefined
        )
                return false;
        if (sampleObj.prototype !== compareObj.prototype) return false;
        let keys = Object.keys(sampleObj);
        if (keys.length !== Object.keys(compareObj).length) return false;
        return keys.every(k => equals(sampleObj[k], compareObj[k]));
}

export { equals };
