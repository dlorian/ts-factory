const { stream } = require('../src/index');

const options = {
    start: '2018-08-01',
    end: '2018-09-01',
    format: 'json',
    granularity: 'hourly'
};

// sut
stream(options).on('data', (data) => console.log(data));