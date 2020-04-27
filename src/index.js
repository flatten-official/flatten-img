// const fs = require('fs');
const { InsightsRenderer } = require('./render');

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let insights = new InsightsRenderer({
    width: 1000,
    height: 1000
  });

  res.setHeader('Content-Type', 'image/svg+xml');
  // fs.writeFileSync("test.svg",
  //   insights.getSvg());
  res.status(200).send(insights.getSvg());
})

app.listen(port, () => console.log(`Image app listening at http://localhost:${port}`))
