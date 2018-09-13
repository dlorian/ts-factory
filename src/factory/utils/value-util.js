const roundTo = require('round-to');
const randomFloat = require('random-float');

module.exports = {
    generateFloat: () => roundTo(randomFloat(10, 100), 3)
};