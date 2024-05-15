function swap(array, element1, element2) {
  let temp = array[element1];
  array[element1] = array[element2];
  array[element2] = temp;
}

function routeDistance(points) {
  let sum = 0;
  for (let i = 0; i < points.length - 1; i++) {
    sum += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
  return sum;
}

function bestRouteToStr(bestRoute) {
  let str = "";
  bestRoute.forEach((city) => {
    str = str.concat(`${city.cityName}  `);
  });

  return str;
}
