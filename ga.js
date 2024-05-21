let middleLastIdx = 6;
let leftsIdxs = [6, 7, 8, 9, 0, 1, 2];
let middleIdxs = [3, 4, 5];

function createParents() {
  parent1 = shuffle(cities);
  parent2 = shuffle(cities);
  while (parent1 === parent2.reverse()) {
    parent2 = shuffle(cities);
  }
}

function nextGeneration() {
  let loop = 0;

  while (true) {
    // if (loop === 1000) {
    //   increaseXOverRatio();
    //   xoverRatio = 4;
    // }
    // if (loop === 2000) {
    //   increaseXOverRatio();
    //   xoverRatio = 5;
    // }

    let offsprings = orderCrossoverShifted(parent1, parent2);
    let offspringsFitness = [
      routeDistance(offsprings[0]),
      routeDistance(offsprings[1]),
    ];

    let parentsFitness = [routeDistance(parent1), routeDistance(parent2)];

    c1MinimumDist = Math.min.apply(Math, offspringsFitness);
    parentMinimumDist = Math.min.apply(Math, parentsFitness);

    c1Minimum = offsprings[offspringsFitness.indexOf(c1MinimumDist)];

    // FITNESS TEST
    if (
      c1MinimumDist < parentMinimumDist ||
      marginOfError(c1MinimumDist, parentMinimumDist) < 0.01
    ) {
      parent1 = c1Minimum;
      parent2 = shuffle(cities);
      while (parent1 === parent2.reverse()) {
        parent2 = shuffle(cities);
      }
      best = c1Minimum;
      fitnessList.push(c1MinimumDist);
      break;
    } else {
      parent2 = shuffle(cities);
    }
  }
  resetXOverRatio();
}

function increaseXOverRatio() {
  middleLastIdx++;
  unangElementSaLefts = leftsIdxs[0];
  leftsIdxs.shift();
  middleIdxs.push(unangElementSaLefts);
}

function resetXOverRatio() {
  middleLastIdx = 6;
  leftsIdxs = [6, 7, 8, 9, 0, 1, 2];
  middleIdxs = [3, 4, 5];
}

function orderCrossover(p1, p2) {
  let parent1RemainLeft = p1.slice(0, 3);
  let parent1XOverSection = p1.slice(3, middleLastIdx);
  let parent1RemainRight = p1.slice(middleLastIdx, 10);

  let parent2RemainLeft = p2.slice(0, 3);
  let parent2XOverSection = p2.slice(3, middleLastIdx);
  let parent2RemainRight = p2.slice(middleLastIdx, 10);

  let c1 = createOffspring(
    parent1RemainLeft,
    parent1XOverSection,
    parent1RemainRight,
    parent2XOverSection
  );
  let c2 = createOffspring(
    parent2RemainLeft,
    parent2XOverSection,
    parent2RemainRight,
    parent1XOverSection
  );

  mutate(c1);
  mutate(c2);

  return [c1, c2];
}

function createOffspring(p1Left, p1Center, p1Right, p2Center) {
  let temp = p1Right.concat(p1Left).concat(p1Center);
  let trimmedTemp = [];
  temp.forEach((t) => {
    if (!p2Center.includes(t)) {
      trimmedTemp.push(t);
    }
  });

  let offspring = [];

  let j = 0;
  leftsIdxs.forEach((i) => {
    offspring[i] = trimmedTemp[j];
    j++;
  });
  j = 0;
  middleIdxs.forEach((i) => {
    offspring[i] = p2Center[j];
    j++;
  });

  return offspring;
}

function orderCrossoverShifted(p1, p2) {
  let p1XOver = p1.slice(0, 3);
  let p2XOver = p2.slice(0, 3);

  let c1 = createOffspringShifted(p1, p2XOver);
  let c2 = createOffspringShifted(p2, p1XOver);

  mutate(c1);
  mutate(c2);

  return [c1, c2];
}

function createOffspringShifted(p1, p2XOver) {
  let trimmedTemp = [];
  p1.forEach((t) => {
    if (!p2XOver.includes(t)) {
      trimmedTemp.push(t);
    }
  });

  let offspring = [];
  let j = 0;
  [3, 4, 5, 6, 7, 8, 9].forEach((i) => {
    offspring[i] = trimmedTemp[j];
    j++;
  });
  j = 0;
  [0, 1, 2].forEach((i) => {
    offspring[i] = p2XOver[j];
    j++;
  });

  return offspring;
}

function mutate(offspring) {
  idx1 = Math.floor(Math.random() * cities.length);
  idx2 = Math.floor(Math.random() * cities.length);
  while (idx1 === idx2) {
    idx2 = Math.floor(Math.random() * cities.length);
  }

  swap(offspring, idx1, idx2);
}
