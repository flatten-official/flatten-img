const d3 = require('d3');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const card = require("./card");

class InsightsRenderer {

  constructor(config) {
    this.config = config;
    this.initDom();
    this.drawn = false;
  }

  initDom() {
    this.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    this.body = d3.select(this.dom.window.document).select('body');

    // Make an SVG Container
    this.container = this.body.append('div').attr('class', 'container')
      .append("svg")
      .attr("width", this.config.width)
      .attr("height", this.config.height)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }

  draw() {
    this.drawn = true;

    card({
      container: this.container,
      x: 50,
      y: 50,
      width: 180,
      height: 240,
      topText: "Potential Cases Reported",
      numberText: "80%",
      bottomText: "Potential Cases: 34\nTotal Reports: 99",
      curveNumbers: {
        'blue': 50,
        'black': 20
      }

    });

  }

  getSvg() {
    if (!this.drawn) {
      this.draw()
    }

    return this.body.select('.container').html()

  }

}

module.exports = {InsightsRenderer};