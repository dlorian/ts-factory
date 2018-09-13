const { Transform } = require('stream');

const _transform = (data, firstChunk) => {
    return `${firstChunk ? '' : ','}{
    "date": "${data.tsDate}",
    "value": ${data.tsValue}
}`;
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
            stream.push(']');
            done(null);
        }
    });

    stream.on('pipe', () => {
        stream.push('[');
    });

    return stream;
};

module.exports = { stream };