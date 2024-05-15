function renderCityName(color, size, weight) {
  renderText(color, size, weight);
  for (let i = 0; i < cities.length; i++) {
    text(cities[i].cityName, cities[i].x + 5, cities[i].y);
  }
}

function renderVertices(path, color, ellipseSize, vertexWeight) {
  stroke(color.r, color.g, color.b);
  strokeWeight(vertexWeight);
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
    ellipse(path[i].x, path[i].y, ellipseSize, ellipseSize);
  }
  endShape();
}

function renderText(color, size, weight, content = "", x = null, y = null) {
  stroke(color.r, color.g, color.b);
  fill(255);
  textSize(size);
  strokeWeight(weight);

  if (content !== "" && x && y) {
    text(content, x, y);
  }
}

function renderLabels() {
  renderText(
    textColor,
    labelTextSize,
    labelTextWeight,
    "Current best path (red)",
    labelTextPos.x,
    labelTextPos.y
  );
  renderText(
    textColor,
    labelTextSize,
    labelTextWeight,
    `Distance = ${recordDistance}`,
    labelTextPos.x,
    labelTextPos.y + 20
  );
  renderText(
    textColor,
    labelTextSize,
    labelTextWeight,
    `Generation = ${currentGeneration}`,
    labelTextPos.x,
    labelTextPos.y + 40
  );

  renderText(
    textColor,
    labelTextSize,
    labelTextWeight,
    `Route = ${bestRoute}`,
    labelTextPos.x,
    labelTextPos.y + 60
  );

  renderText(
    textColor,
    labelTextSize,
    labelTextWeight,
    `Crossover Ratio = ${xoverRatio}`,
    labelTextPos.x,
    labelTextPos.y + 80
  );
}
