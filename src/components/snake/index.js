import React, { useState, useEffect } from "react";
import "./index.css";
import * as helpers from "./helpers.js";

const width = 20;
const height = 12;

function Snake() {
  const [game, setGame] = useState(helpers.generateGame());
  useEffect(() => {
    const intervalId = setInterval(() => setGame(oldGame =>helpers.tick(game)), 400);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
  //www.keycode.info
  function handleKeyPress(event) {
    let newDir = null;
    switch (event.keyCode) {
      case 37:
      case 100:
        newDir = "left";
        break;
      case 38:
      case 104:
        newDir = "up";
        break;
      case 39:
      case 102:
        newDir = "right";
        break;
      case 40:
      case 98:
        newDir = "down";
        break;
    }
    if (newDir !== undefined) {
      setGame((oldGame) => {
        return { ...oldGame, snake: { ...oldGame.snake, direction: newDir } };
      });
    }
  }

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = { x, y }; // same as {x:x,y:y}
      let className = "";
      if (helpers.isEqual(cell, game.snake.head)) {
        className = " head";
        //console.log(game.food);
      } else if (helpers.isEqual(cell, game.food)) {
        className = " food";
        //console.log(game.snake.tail);
      } else if (
        game.snake.tail.some((tailCell) => helpers.isEqual(cell, tailCell))
      ) {
        className = " tail";
      }
      cells.push(
        <div key={x + "-" + y} className={"snake-cell" + className}></div>
      );
    }
  }
  return (
    <div className="game-container">
      <div className="snake-grid">{cells}</div>
    </div>
  );
}

export default Snake;
