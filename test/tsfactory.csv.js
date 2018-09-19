const { stream } = require('../src');

const options = {
    start: '2018-08-01',
    end: '2018-09-01',
    format: 'csv',
    granularity: 'hourly'
};

// sut
stream(options).pipe(process.stdout);