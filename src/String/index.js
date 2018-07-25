import { mask } from "./Mask";
import { convertToCamel } from "./Convert";
import { isEmpty, isNull, isValid } from "../Type/index";

function stringExpansion() {
        String.prototype.mask = mask;
        String.prototype.convertToCamel = convertToCamel;
        String.prototype.isEmpty = isEmpty;
        String.prototype.isNull = isNull;
        String.prototype.isValid = isValid;
}

export { stringExpansion };
