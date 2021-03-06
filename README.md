# ts-factory

[![Build Status](https://travis-ci.org/dlorian/ts-factory.svg?branch=master)](https://travis-ci.org/dlorian/ts-factory)
![SonarCloud (.io)](https://sonarcloud.io/api/project_badges/measure?project=dlorian_ts-factory&metric=alert_status)

_ts-factory_ is just a simple factory used to create some kind of times series mock data.

# Install

If you want to install it you can use npm for this

```
npm install @dlorian/ts-factory
```

# Usage

```js
const tsFactory = require("@dlorian/ts-factory");

const tsOptions = {
  start: "2018-01-01",
  end: "2019-01-01"
};

const tsStream = tsFactory.stream(tsOptions);

tsStream.pipe(process.stdout);
```

# Options

| Option      | Desc                                    | Expected input                      | Required             |
| ----------- | --------------------------------------- | ----------------------------------- | -------------------- |
| start       | Wanted start date of times series       | date string in format 'yyyy-mm-dd'  | yes                  |
| end         | Wanted end date of times series         | date string in format 'yyyy-mm-dd'  | yes                  |
| granulartiy | Granularity of the output time series   | 'daily', 'hourly', 'quarter_hourly' | no, default 'hourly' |
| format      | Wanted output format of the time series | 'json', 'xml', 'csv'                | no, default 'json'   |
