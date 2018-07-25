import { equals } from "./Equals";
import { findKey } from "./Find";
import { omit, omitBy } from "./Omit";
import { pick, pickBy } from "./Pick";
import  { isEmpty, isNull, isValid } from '../Type/index';

function objectExpansion() {
        Object.prototype.equals = equals;
        Object.prototype.findKey = findKey;
        Object.prototype.omit = omit;
        Object.prototype.omitBy = omitBy;
        Object.prototype.pick = pick;
        Object.prototype.pickBy = pickBy;
        Object.prototype.isEmpty = isEmpty;
        Object.prototype.isNull = isNull;
        Object.prototype.isValid = isValid;
}

export { objectExpansion };
