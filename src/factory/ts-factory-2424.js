const { Readable } = require('stream');

const create = (stream, startDate, endDate, offset, valueSupplier) => {
    let currentDate = startDate;
    do {
        stream.push({ tsDate: currentDate, tsValue: valueSupplier.getValue() });
        currentDate = currentDate.plus(offset);
    } while (currentDate < endDate);

    stream.push(null);
};

const stream = (startDate, endDate, offset, valueSupplier) => {
    const stream = new Readable({
        objectMode: true,
        read() {}
    });

    create(stream, startDate, endDate, offset, valueSupplier);

    return stream;
};

module.exports = { stream };
