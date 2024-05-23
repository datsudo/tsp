function renderCityName(color, size, weight) {
  renderText(color, size, weight);
  for (let i = 0; i < cities.length; i++) {
    text(cities[i].cityName, cities[i].x + 5, cities[i].y);
  }
}

function renderVertices(path, color, ellipseSize, vertexWeight) {
  path.push(path[0]);
  stroke(color.r, color.g, color.b);
  strokeWeight(vertexWeight);
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x + 300, path[i].y + 300);
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

class Controls {
  static move(controls) {
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    function mouseDragged(e) {
      const { prevX, prevY, isDragging } = controls.viewPos;
      if (!isDragging) return;

      const pos = { x: e.clientX, y: e.clientY };
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if (prevX || prevY) {
        controls.view.x += dx;
        controls.view.y += dy;
        (controls.viewPos.prevX = pos.x), (controls.viewPos.prevY = pos.y);
      }
    }

    function mouseReleased(e) {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }

    return {
      mousePressed,
      mouseDragged,
      mouseReleased,
    };
  }

  static zoom(controls) {
    // function calcPos(x, y, zoom) {
    //   const newX = width - (width * zoom - x);
    //   const newY = height - (height * zoom - y);
    //   return {x: newX, y: newY}
    // }

    function worldZoom(e) {
      const { x, y, deltaY } = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;

      const wx = (x - controls.view.x) / (width * controls.view.zoom);
      const wy = (y - controls.view.y) / (height * controls.view.zoom);

      controls.view.x -= wx * width * zoom;
      controls.view.y -= wy * height * zoom;
      controls.view.zoom += zoom;
    }

    return { worldZoom };
  }
}
