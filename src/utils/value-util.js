const formatDecimal = require('format-decimal');

exports.toDecimal = value => formatDecimal(value, {precision: 3});