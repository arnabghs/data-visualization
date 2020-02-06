const drawBuildings = buildings => {
  const WIDTH = 400;
  const HEIGHT = 400;
  const MAX_HEIGHT_OF_DOMAIN = _.maxBy(buildings, "height").height;

  const toLine = b => `<strong>${b.name}</strong> <i>${b.height}</i>`;

  document.querySelector("#chart-data").innerHTML = buildings
    .map(toLine)
    .join("<hr/>");

  const container = d3.select("#chart-area");
  const svg = container
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

  const y = d3
    .scaleLinear()
    .domain([0, MAX_HEIGHT_OF_DOMAIN])
    .range([0, HEIGHT]);

  const x = d3
    .scaleBand()
    .range([0, WIDTH])
    .domain(_.map(buildings, "name"))
    .padding(0.3);
  // .paddingInner(0.3)
  // .paddingOuter(0.3);

  const rectangles = svg.selectAll("rect").data(buildings);
  const newRects = rectangles
    .enter()
    .append("rect")
    .attr("x", (b, i) => x(b.name))
    .attr("width", x.bandwidth)
    .attr("height", b => y(b.height));
};

const main = () => {
  d3.json("data/buildings.json").then(drawBuildings);
};
window.onload = main;
