const { Transform } = require('stream');
const { toFormat } = require('../utils/date-util');

const _transform = (data) => {
    return `
    <TimeSeriesValue i="${toFormat(data.tsDate, 'yyyy-MM-dd')}T${toFormat(data.tsDate, 'HH:mm:ss')}">${data.tsValue}</TimeSeriesValue>`;
};

const stream = () => {
    const stream = new Transform({
        objectMode: true,

        transform: (data, _, done) => {
            done(null, _transform(data));
        },

        final: done => {
            stream.push('\n</TimeSeriesValues>');
            done(null);
        }
    });

    stream.on('pipe', () => {
        stream.push('<TimeSeriesValues>');
    });

    return stream;
};

module.exports = { stream };