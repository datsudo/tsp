// Status
let cities = [];
let order = [];
let existingCombination = new Set();
let currentGeneration = 0;

let parent1;
let parent2;
let best;
let xoverRatio = 3;
let bestRoute;
let fitnessList = [];
let recordDistance;

let canvas, circles;
const controls = {
  view: { x: -2700, y: -2400, zoom: 7 },
  viewPos: { prevX: null, prevY: null, isDragging: false },
};

function setup() {
  canvas = createCanvas(1200, 670);
  canvas.mouseWheel((e) => Controls.zoom(controls).worldZoom(e));

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
  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  drawGrid();

  nextGeneration();

  renderVertices(best, red, 1, 1);
  // renderCityName(textColor, 14, 3);

  recordDistance = routeDistance(best);
  bestRoute = routeToStr(best);
  // renderLabels();

  if (currentGeneration >= MAX_GENERATION) {
    fitnessList = getFitness(fitnessList);
    new Chart($("#graph"), {
      type: "line",
      data: {
        labels: Array.from({ length: fitnessList.length }, (_, idx) => idx + 1),
        datasets: [
          {
            label: "Fitness",
            data: fitnessList,
            borderColor: "blue",
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Generations",
            },
          },
        },
      },
    });
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
window.mousePressed = (e) => Controls.move(controls).mousePressed(e);
window.mouseDragged = (e) => Controls.move(controls).mouseDragged(e);
window.mouseReleased = (e) => Controls.move(controls).mouseReleased(e);
