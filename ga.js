function createParents() {
  parent1 = shuffle(cities);
  parent2 = shuffle(cities);
  while (parent1 === parent2.reverse()) {
    parent2 = shuffle(cities);
  }
}

function nextGeneration() {
  // TODO
  while (true) {
    let offsprings = orderCrossover(parent1, parent2);
    let offspringsFitness = [
      routeDistance(offsprings[0]),
      routeDistance(offsprings[1]),
    ];

    let parentsFitness = [routeDistance(parent1), routeDistance(parent2)];

    c1MinimumDist = Math.min.apply(Math, offspringsFitness);
    parentMinimumDist = Math.min.apply(Math, parentsFitness);

    c1Minimum = offsprings[offspringsFitness.indexOf(c1MinimumDist)];

    if (c1MinimumDist < parentMinimumDist) {
      parent1 = c1Minimum;
      parent2 = shuffle(cities);
      while (parent1 === parent2.reverse()) {
        parent2 = shuffle(cities);
      }
      best = c1Minimum;
      break;
    } else {
      parent2 = shuffle(cities);
    }
  }
}

function orderCrossover(p1, p2) {
  let parent1XOverSection = p1.slice(3, 6);
  let parent1RemainLeft = p1.slice(0, 3);
  let parent1RemainRight = p1.slice(6, 10);

  let parent2XOverSection = p2.slice(3, 6);
  let parent2RemainLeft = p2.slice(0, 3);
  let parent2RemainRight = p2.slice(6, 10);

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

  return [c1, c2];
}

function createOffspring(p1Left, p1Center, p1Right, p2Center) {
  let temp1 = p1Right.concat(p1Left).concat(p1Center);
  let trimmedTemp1 = [];
  temp1.forEach((t) => {
    if (!p2Center.includes(t)) {
      trimmedTemp1.push(t);
    }
  });

  let offspring = [];

  let j = 0;
  [6, 7, 8, 9, 0, 1, 2].forEach((i) => {
    offspring[i] = trimmedTemp1[j];
    j++;
  });
  j = 0;
  [3, 4, 5].forEach((i) => {
    offspring[i] = p2Center[j];
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
