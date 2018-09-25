const roundTo = require('round-to');
const randomFloat = require('random-float');

class DefaultValueSupplier {
    constructor(values) {
        this.idx = 0;
        this.values = values;
    }

    getValue() {
        return this.values[this.idx++ % this.values.length];
    }
}

class RandomValueSupplier {
    getValue() {
        return roundTo(randomFloat(10, 100), 3);
    }
}

module.exports = {
    createRandomValueSupplier: () => new RandomValueSupplier(),
    createDefaultValueSupplier: values => new DefaultValueSupplier(values)
};
