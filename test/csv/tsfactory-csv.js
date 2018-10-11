const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('csv', () => {
    it('should return valid hourly time series', done => {
        const options = {
            start: '2019-01-01',
            end: '2019-01-02',
            format: 'csv',
            granularity: 'hourly',
            values: [1]
        };

        const stream = tsFactory.stream(options);
        assertTsStream(
            stream,
            'csv',
            'ts-output-csv.txt',
            'ts-sample-csv.txt',
            done
        );
    });
});
