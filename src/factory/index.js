const log = require('../logger');
const dateUtils = require('../utils/date-util');
const factory2325 = require('./ts-factory-2325');
const factory2424 = require('./ts-factory-2424');

const GRANUlARITY = {
    QUARTER_HOURLY: { minutes: 15 },
    HOURLY: { hours: 1 },
    DAILY: { hours: 24 }
};

const DST_MODE = {
    DST_2424: '2424',
    DST_2325: '2325',

    is2325: (mode) => mode === '2325'
};

const factories = {
    get: (mode) => DST_MODE.is2325(mode) ? factory2325 : factory2424
};

const stream = (start, end, options) => {
    options = options || {};
    const granulartiy = options.granulartiy || 'HOURLY';
    const dstMode = options.dstMode || '2424';

    let startDate = dateUtils.fromISO(start);
    startDate = dateUtils.toDayStart(startDate);

    let endDate = dateUtils.fromISO(end);
    endDate = dateUtils.toDayStart(endDate);

    const offset = GRANUlARITY[granulartiy];
    if (!offset) {
        throw new Error(`Granulartiy ${granulartiy} is not defined`);
    }

    return factories.get(dstMode)
        .stream(startDate, endDate, offset)
        .on('error', (err) => log.error('error while ts-factory stream', err));
};

module.exports = { stream };