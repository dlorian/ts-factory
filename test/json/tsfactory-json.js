const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('json', () => {
    describe('DST "2424"', () => {
        it('should return valid hourly time series', done => {
            const options = {
                start: '2019-01-01',
                end: '2020-01-01',
                format: 'json',
                granularity: 'hourly',
                values: [1]
            };

            const stream = tsFactory.stream(options);
            assertTsStream(
                stream,
                'json',
                'ts-output-json.txt',
                'ts-sample-json.txt',
                done
            );
        });
    });
});
