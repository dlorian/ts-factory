const valueUtil = require('../utils/value-util');

const { Readable } = require('stream');

const create = (stream, startDate, endDate, offset) => {
    let currentDate = startDate;
    do {
        stream.push({ tsDate: currentDate, tsValue: valueUtil.generateFloat() });
        currentDate = currentDate.plus(offset);
    } while (currentDate < endDate);

    stream.push(null);
};

const stream = (startDate, endDate, offset) => {
    const stream = new Readable({
        objectMode: true,
        read() { }
    });

    create(stream, startDate, endDate, offset);

    return stream;
};

module.exports = { stream };