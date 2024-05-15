// Status
let cities = [];
let order = [];
let existingCombination = new Set();
let currentGeneration = 0;

let parent1;
let parent2;
let best;
let xoverRatio = 3;
let bestRoute = "";
let recordDistance;

function setup() {
  createCanvas(900, 670);
  frameRate(40);

  for (let i = 0; i < coords.length; i++) {
    const v = createVector(coords[i][0] + 200, coords[i][1] + 70);
    cities[i] = v;
    order[i] = i;
    v.cityName = coords[i][2];
  }

  createParents();
}

function draw() {
  background(210);
  drawGrid();

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

  xoverRatio = 3;

  currentGeneration++;
}

function drawGrid() {
  textSize(10);
  stroke(200);
  fill(120);
  for (let x = -width; x < width; x += 40) {
    line(x, -height, x, height);
    text(x, x + 1, 12);
  }
  for (let y = -height; y < height; y += 40) {
    line(-width, y, width, y);
    fill(255, 100, 0);
    text(y, 1, y + 12);
  }
}
