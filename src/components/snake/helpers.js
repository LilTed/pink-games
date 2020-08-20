const width = 20;
const height = 12;

export function generateGame() {
  const snake = {
    head: {
      x: width / 2,
      y: height / 2,
    },
    tail: [
      {
        x: width / 2 - 1,
        y: height / 2,
      },
    ],
    direction: "right",
  };
  return {
    snake: snake,
    food: generateFood(snake),
  };
}

export function isEqual(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
export function tick(game){
    return game;
}

export function generateFood(snake) {
  let food = { ...snake.head };
  
  while (
    isEqual(food, snake.head) ||
    snake.tail.some((cell) => isEqual(food, cell))
  ) {
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  }
  return food;
}
