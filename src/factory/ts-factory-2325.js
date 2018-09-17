const dateUtil = require('./utils/date-util');
const valueUtil = require('./utils/value-util');

const { Readable } = require('stream');

const create = (stream, startDate, endDate, offset) => {
    let currentDate = startDate;
    let octoberShifted = false;
    let marchShifted = false;

    const dstTimeOfMarch = dateUtil.getDstDateTime(currentDate.get('year'), 'march');
    const dstTimeOfOctober = dateUtil.getDstDateTime(currentDate.get('year'), 'october');

    do {
        const march = currentDate.month === 3;
        if (march) {
            if (currentDate.hasSame(dstTimeOfMarch, 'minute') && !marchShifted) {
                marchShifted = true;
                currentDate = currentDate.plus({ hours: 1 });
            }
        }

        const october = currentDate.month === 10;
        if (october) {
            if (currentDate.hasSame(dstTimeOfOctober, 'minute') && !octoberShifted) {
                octoberShifted = true;
                currentDate = currentDate.minus({ hours: 1 });
            }
        }
        stream.push({ tsDate: currentDate.toISO(), tsValue: valueUtil.generateFloat() });

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