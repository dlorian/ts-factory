const { Transform } = require('stream');
const { toDate, toTime } = require('../utils/date-util');

const _transform = (data) => {
    return `${toDate(data.tsDate)};${toTime(data.tsDate)};${data.tsValue}
    `;
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