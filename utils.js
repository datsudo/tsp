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

function isUnique(arr1, arr2) {
  for (let i = 0; i < arr1.length; ) {
    if (arr1[i] === arr2[i]) {
      return false;
    }
  }

  return true;
}
