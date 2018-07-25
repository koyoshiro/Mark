import { format } from './Format';
import { betweenDate } from './BetweenDate';
import { tomorrow } from './Tomorrow';

function dateExpansion() {
    Date.prototype.format = format;
    Date.prototype.betweenDate = betweenDate;
    Date.prototype.tomorrow = tomorrow;
};

export {
    dateExpansion
}