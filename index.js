// Instructions:
//  npm install --save d3 jsdom


// sample source: https://gist.github.com/kunnix/148eadcfde3e978a1ad1d3ec9e2a7265

const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

const outputLocation = './output.svg';

let body = d3.select(fakeDom.window.document).select('body');

// Make an SVG Container
let svgContainer = body.append('div').attr('class', 'container')
  .append("svg")
  .attr("width", 1280)
  .attr("height", 1024);

// Draw a line
let circle = svgContainer.append("line")
  .attr("x1", 5)
  .attr("y1", 5)
  .attr("x2", 500)
  .attr("y2", 500)
  .attr("stroke-width", 2)
  .attr("stroke", "black");

// Output the result to console
console.log(body.select('.container').html());

// Output the result to file
fs.writeFileSync(outputLocation, body.select('.container').html());
