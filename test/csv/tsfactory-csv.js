const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('csv', () => {
    describe('DST "2325"', () => {
        it('should return valid hourly time series', done => {
            const options = {
                start: '2019-01-01',
                end: '2020-01-01',
                format: 'csv',
                granularity: 'hourly',
                dst: '2325',
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
});
