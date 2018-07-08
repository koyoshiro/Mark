Array.prototype.count = function(value) {
    this.reduce((a, v) => (v === value ? a + 1 : a), 0);
}