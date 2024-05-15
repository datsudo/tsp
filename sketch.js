// Status
let cities = [];
let existingCombination = new Set();
let currentGeneration = 0;

let parent1;
let parent2;
let recordDistance;

function setup() {
  createCanvas(1200, 675);

  for (let i = 0; i < coords.length; i++) {
    const v = createVector(coords[i][0] - 40, coords[i][1] + 50);
    cities[i] = v;
    v.cityName = coords[i][2];
  }
}

function draw() {
  background(0);

  // show the current best
  renderVertices(cities, bestPathColor, 19, 3);
  renderCityName(textColor, 14, 3);

  recordDistance = routeDistance(cities);
  renderLabels();

  translate(width / 2, 0);
  // render path iteration
  renderVertices(cities, pathColor, 5, 1);

  if (currentGeneration >= MAX_GENERATION) {
    throw stopRendering;
  }

  currentGeneration++;
}
