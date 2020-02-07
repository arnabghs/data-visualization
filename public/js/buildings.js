const drawBuildings = buildings => {
  const MAX_HEIGHT_OF_DOMAIN = _.maxBy(buildings, "height").height;
  const CHART_SIZE = { width: 600, height: 400 };
  const MARGIN = { left: 100, right: 10, top: 10, bottom: 150 };
  const WIDTH = CHART_SIZE.width - (MARGIN.left + MARGIN.right);
  const HEIGHT = CHART_SIZE.height - (MARGIN.top + MARGIN.bottom);

  const toLine = b => `<strong>${b.name}</strong> <i>${b.height}</i>`;

  document.querySelector("#chart-data").innerHTML = buildings
    .map(toLine)
    .join("<hr/>");

  const container = d3.select("#chart-area");
  const svg = container
    .append("svg")
    .attr("width", CHART_SIZE.width)
    .attr("height", CHART_SIZE.height);

  //
  g = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  g.append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 140)
    .attr("class", "axis-label")
    .text("Tall Buildings");

  g.append("text")
    .attr("x", -HEIGHT / 2)
    .attr("y", -60)
    .attr("class", "y axis-label")
    .attr("transform", "rotate(-90)")
    .text("Height(m)");

  const y = d3
    .scaleLinear()
    .domain([0, MAX_HEIGHT_OF_DOMAIN])
    .range([0, HEIGHT]);

  const x = d3
    .scaleBand()
    .range([0, WIDTH])
    .domain(_.map(buildings, "name"))
    .padding(0.3);

  const yAxis = d3
    .axisLeft(y)
    .tickFormat(d => d + "m")
    .ticks(3);

  const xAxis = d3.axisBottom(x);

  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxis);

  g.selectAll(".x-axis text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");

  const rectangles = g.selectAll("rect").data(buildings);
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
