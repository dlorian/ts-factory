const { Transform } = require('stream');

const _transform = (data) => {
    return `
    <TimeSeriesValue i="${data.tsDate}">${data.tsValue}</TimeSeriesValue>`;
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