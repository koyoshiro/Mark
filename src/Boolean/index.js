import { isEmpty, isNull, isValid } from "../Type/index";

function booleanExpansion() {
        Boolean.prototype.isEmpty = isEmpty;
        Boolean.prototype.isNull = isNull;
        Boolean.prototype.isValid = isValid;
}

export { booleanExpansion };
