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
export function tick(oldGame) {
  const oldSnake = oldGame.snake;
  const oldFood = oldGame.food;

  const newHead = generateNewHead(oldSnake);
  const newTail = generateNewTail(oldSnake, oldFood, newHead);
  const newSnake = {
    ...oldSnake,
    head: newHead,
    tail: newTail,
  };

  let newFood = oldFood;

  if (isEqual(newFood, newHead)) {
    newFood = generateFood(newSnake);
  }

  return {
    snake: newSnake,
    food: newFood,
  };
}
function generateNewHead(oldSnake) {
  let newHead;
  switch (oldSnake.direction) {
    case "right":
      newHead = { x: oldSnake.head.x + 1, y: oldSnake.head.y };
      break;
    case "down":
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y + 1 };  
      break;
    case "left":
      newHead = { x: oldSnake.head.x - 1, y: oldSnake.head.y };
      break;
    case "up":
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y - 1 };
      break;
  }
  return newHead;
}
function generateNewTail(oldSnake, oldFood, newHead) {
  // Create a variable newTail (an array). Its first cell should be the old snake's head
  // and the rest of the cells should be the old snake's tail. Use concat() function
  // to add (append) a whole array to another array. Or you can use the [...myArray] syntax somehow... :) 
  let newTail = [oldSnake.head].concat(oldSnake.tail);
  // Now the snake's tail has become longer! We should keep it like that if the snake has eaten,
  // otherwise we need to shorten it (remove the last element). Use the pop() function.
  if (!isEqual(newHead, oldFood)) {
    newTail.pop();
  }
  // Don't forget to return newTail!
  return newTail;
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
export function isGameOver(game){
    const snake = game.snake;
    return isOutOfBounds(snake.head) || snake.tail.some((cell) => isEqual(cell, snake.head));

}
function isOutOfBounds(cell) {
    return cell.x<0 || cell.x>=width || cell.y<0 || cell>=height
}