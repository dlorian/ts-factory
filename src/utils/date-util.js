const { DateTime } = require('luxon');

DateTime.local().setZone('local');
DateTime.local().reconfigure({ locale: 'de' });

const fromISO = dateString => {
    const date = DateTime.fromISO(dateString, { locale: 'de' });
    if (!date.isValid) {
        throw new Error(dateString + ' is not a valid date');
    }

    return date;
};

const getDate = (year, month, day, hour, minute, second) => {
    return DateTime.local(year, month, day, hour, minute, second);
};

const toDayStart = date => {
    return date.startOf('day');
};

const toDateTime = date => {
    return date.toISO();
};

const toDate = date => {
    return date.toISODate();
};

const toTime = date => {
    return date.toISOTime();
};

const toFormat = (date, pattern) => {
    return date.toFormat(pattern);
};

const getLastSunday = date => {
    const sunday = 7;

    let currentDate = date.endOf('month');

    while (currentDate.weekday !== sunday) {
        currentDate = currentDate.minus({ hours: 24 });
    }

    return toDayStart(currentDate);
};

const getDstDateTime = (year, month) => {
    if ('march' === month || 3 === month) {
        const lastSunday = getLastSunday(DateTime.local(year, 3, 31, 0, 0, 0));
        return getDate(
            lastSunday.get('year'),
            lastSunday.get('month'),
            lastSunday.get('day'),
            2,
            0,
            0
        );
    } else if ('october' === month || 10 === month) {
        const lastSunday = getLastSunday(DateTime.local(year, 10, 31, 0, 0, 0));
        return getDate(
            lastSunday.get('year'),
            lastSunday.get('month'),
            lastSunday.get('day'),
            3,
            0,
            0
        );
    } else {
        throw new Error(
            `${month} is not supported. Must be either march or october`
        );
    }
};

module.exports = {
    fromISO,
    toDateTime,
    toDate,
    toTime,
    toFormat,
    getDate,
    toDayStart,
    getDstDateTime
};
