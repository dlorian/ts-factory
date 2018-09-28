const tsFactory = require('../../src');
const { assertTsStream } = require('../util/ts-test-util');

describe('json', () => {
    it('should return valid hourly time series', done => {
        const options = {
            start: '2018-11-04',
            end: '2018-11-05',
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
    }).timeout(0);
});
