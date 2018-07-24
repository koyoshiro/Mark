import { format } from './Format';
import { betweenDate } from './BetweenDate';
import { tomorrow } from './Tomorrow';
import  { isEmpty, isNull, isValid } from '../Type/index';

function dateExpansion() {
    Date.prototype.format = format;
    Date.prototype.betweenDate = betweenDate;
    Date.prototype.tomorrow = tomorrow;
    Date.prototype.isEmpty = isEmpty;
    Date.prototype.isNull = isNull;
    Date.prototype.isValid = isValid;
};

export {
    dateExpansion
}