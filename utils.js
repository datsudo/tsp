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
  sum += dist(
    points[points.length - 1].x,
    points[points.length - 1].y,
    points[0].x,
    points[0].y
  );
  return sum;
}

function routeToStr(route) {
  let str = "";
  str = str.concat("[ ");
  route.forEach((city) => {
    str = str.concat(`${city.cityName} `);
  });
  str = str.concat("]");

  return str;
}

function marginOfError(num1, num2) {
  return Math.abs(num1 - num2) / num2;
}

function getFitness(fl) {
  return fl
    .sort()
    .reverse()
    .slice(0, fitnessList.length - 1);
}
