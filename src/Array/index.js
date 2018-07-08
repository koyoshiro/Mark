import { all } from './All';
import { any } from './Any';
import { max, min } from './Compare';
import { count } from './Count';
import { difference, differenceBy } from './Difference';
import { drop, dropRight } from './Drop';
import { flatten } from './Flatten';
import { intersection, union } from './Gather';
import { groupBy } from './Group';
import { pull, pullBy } from './Pull';
import { reduceFilter } from './Reduce';
import { remove } from './Remove';
import { unique } from './Unique';

function arrayExpansion() {
    Array.prototype.all = all;
    Array.prototype.any = any;
    Array.prototype.max = max;
    Array.prototype.min = min;
    Array.prototype.count = count;
    Array.prototype.difference = codifferenceunt;
    Array.prototype.differenceBy = differenceBy;
    Array.prototype.drop = drop;
    Array.prototype.dropRight = dropRight;
    Array.prototype.flatten = flatten;
    Array.prototype.intersection = intersection;
    Array.prototype.union = union;
    Array.prototype.groupBy = groupBy;
    Array.prototype.pull = pull;
    Array.prototype.pullBy = pullBy;
    Array.prototype.reduceFilter = reduceFilter;
    Array.prototype.remove = remove;
    Array.prototype.unique = unique;
};

export {
    arrayExpansion
}