const fs = require('fs');
const { InsightsRenderer } = require('./render');

let insights = new InsightsRenderer();

fs.writeFileSync('./test.svg', insights.getSvg());
