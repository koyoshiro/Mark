import { all } from './All.js'

function arrayExpansion() {
    Array.prototype.all = all.bind(this);

};

export {
    arrayExpansion
}