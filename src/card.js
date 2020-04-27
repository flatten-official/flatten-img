const palette = require('./palette');
const d3 = require('d3');

function getPdf(mean, stDev) {
  return (x) => {
    return Math.pow(Math.E,
      -0.5*Math.pow((x-mean)/stDev, 2))
    /(stDev*Math.sqrt(2*Math.PI));
  }
}

/* Params must contain the svg element, width, height
 */
module.exports = function (params) {
  let container = params.container;

  container.append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("x", params.x)
    .attr("y", params.y)
    .attr("width", params.width)
    .attr("height", params.height)
    .attr("fill", palette.tintGray);

  let margin = 10;
  container.append("text")
    .text(params.topText)
    .attr("style", "font-family: \"DM Sans\", sans-serif;")
    .attr("x", params.x + margin)
    .attr("y", params.y + 25)
    .attr("textLength", params.width - 2*margin)
    .attr("fill", palette.black);

  let pdf = getPdf(50, 15);

  let numPoints = 100;
  let points = Array()
  for(let i = 0; i < numPoints; ++i) {
    points.push({
      horiz: i,
      vert: pdf(parseFloat(i))
    });
  }

  let x = d3.scaleLinear()
    .domain(d3.extent(points.map(d=>d.horiz)))
    .range([params.x, params.x+params.width]);

  let y = d3.scaleLinear()
    .domain(d3.extent(points.map(d=>d.vert)))
    .range([params.y+params.height*0.9, params.y+params.height * 0.4]);

  let line = d3.line().x(d=>x(d.horiz)).y(d=>y(d.vert));

  container
    .append("path")
    .attr("stroke", "steelblue")
    .attr("fill", "none")
    .attr("d", line(points))

  return container;

}
