const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('xml', () => {
    describe('DST "2424"', () => {
        it('should return valid hourly time series', done => {
            const options = {
                start: '2019-01-01',
                end: '2020-01-01',
                format: 'xml',
                granularity: 'hourly',
                values: [1]
            };

            const stream = tsFactory.stream(options);
            assertTsStream(
                stream,
                'xml',
                'ts-output-xml.txt',
                'ts-sample-xml.txt',
                done
            );
        });
    });
});
