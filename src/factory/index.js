const log = require('../logger');
const factory2325 = require('./ts-factory-2325');
const factory2424 = require('./ts-factory-2424');

const dateUtils = require('../utils/date-util');
const valueUtil = require('../utils/value-util');
const { isDefined } = require('../utils/assert-util');

const GRANUlARITY = {
    QUARTER_HOURLY: { minutes: 15 },
    HOURLY: { hours: 1 },
    DAILY: { hours: 24 }
};

const DST_MODE = {
    DST_2424: '2424',
    DST_2325: '2325',

    is2325: mode => mode === '2325'
};

const factories = {
    get: mode => (DST_MODE.is2325(mode) ? factory2325 : factory2424)
};

const determineValueSupplier = values => {
    return values.length == 0
        ? valueUtil.createRandomValueSupplier()
        : valueUtil.createDefaultValueSupplier(values);
};

const stream = (start, end, options) => {
    isDefined(start, 'start date must not be defined');
    isDefined(end, 'end date must not be defined');

    options = options || {};
    const granulartiy = options.granulartiy || 'HOURLY';
    const dstMode = options.dstMode || '2424';
    const values = options.values || [];

    let startDate = dateUtils.fromISO(start);
    startDate = dateUtils.toDayStart(startDate);

    let endDate = dateUtils.fromISO(end);
    endDate = dateUtils.toDayStart(endDate);

    const offset = GRANUlARITY[granulartiy.toUpperCase()];
    isDefined(offset, `no offset defined for granulartiy ${granulartiy}`);

    const valueSupplier = determineValueSupplier(values);
    return factories
        .get(dstMode)
        .stream(startDate, endDate, offset, valueSupplier)
        .on('error', err => log.error('error while ts-factory stream', err));
};

module.exports = { stream };
