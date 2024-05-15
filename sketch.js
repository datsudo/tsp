// Status
let cities = [];
let existingCombination = new Set();
let currentGeneration = 0;

let parent1;
let parent2;
let best;
let recordDistance;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < coords.length; i++) {
    const v = createVector(coords[i][0], coords[i][1] + 50);
    cities[i] = v;
    v.cityName = coords[i][2];
  }

  createParents();
}

function draw() {
  background(0);

  nextGeneration();

  // show the current best
  renderVertices(best, bestPathColor, 19, 3);
  renderCityName(textColor, 14, 3);

  recordDistance = routeDistance(best);
  renderLabels();

  if (currentGeneration >= MAX_GENERATION) {
    throw stopRendering;
  }

  currentGeneration++;

  sleep(5000);
}
