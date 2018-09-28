const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('xml', () => {
    it('should return valid hourly time series', done => {
        const options = {
            start: '2018-05-01',
            end: '2019-05-01',
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
    }).timeout(0);
});
