const { Transform } = require('stream');
const { toFormat } = require('../utils/date-util');
const { toDecimal } = require('../utils/value-util');

const _transform = data => {
    return `${toFormat(data.tsDate, 'dd.MM.yyyy')};${toFormat(data.tsDate, 'HH:mm')};${toDecimal(data.tsValue)};${toDecimal(data.tsThirdQty)}\n`;
};

const stream = () => {
    let firstChunk = true;
    const stream = new Transform({
        objectMode: true,

        transform: (data, encoding, done) => {
            const result = _transform(data, firstChunk);
            firstChunk = false;
            done(null, result);
        },

        final: done => {
            done(null);
        }
    });

    return stream;
};

module.exports = { stream };
