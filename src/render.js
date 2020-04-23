const d3 = require('d3');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

class InsightsRenderer {

  constructor(data) {
    this.data = data;
    this.initDom();
    this.drawn = false;
  }

  initDom() {
    this.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    this.body = d3.select(this.dom.window.document).select('body');

    // Make an SVG Container
    this.container = this.body.append('div').attr('class', 'container')
      .append("svg")
      .attr("width", 1280)
      .attr("height", 1024);

  }

  draw() {
    this.drawn = true;
    // Draw a line
    let circle = this.container.append("line")
      .attr("x1", 5)
      .attr("y1", 5)
      .attr("x2", 500)
      .attr("y2", 500)
      .attr("stroke-width", 2)
      .attr("stroke", "black");
  }

  getSvg() {
    if (!this.drawn) {
      this.draw()
    }

    return this.body.select('.container').html()

  }

}

module.exports = {InsightsRenderer};