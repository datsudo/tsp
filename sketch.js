// Status
let cities = [];
let existingCombination = new Set();
let currentGeneration = 0;

let parent1;
let parent2;
let best;
let bestRoute = "";
let recordDistance;

function setup() {
  createCanvas(900, 670);
  frameRate(10);

  for (let i = 0; i < coords.length; i++) {
    const v = createVector(coords[i][0], coords[i][1] + 60);
    cities[i] = v;
    v.cityName = coords[i][2];
  }

  createParents();
}

function draw() {
  background(0);

  nextGeneration();

  // show the best
  renderVertices(best, red, 19, 3);
  renderCityName(textColor, 14, 3);

  recordDistance = routeDistance(best);
  bestRoute = routeToStr(best);
  renderLabels();

  if (
    currentGeneration >= MAX_GENERATION ||
    existingCombination.size == MAX_COMBINATION
  ) {
    throw stopRendering;
  }

  currentGeneration++;
}
