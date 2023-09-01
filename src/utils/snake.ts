import { useCanvasStore, useSnakeStore } from '../store';

import {
  RIGHT,
  LEFT,
  UP,
  DOWN,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from '../AppConstants';
import { SnakeCoordinate } from '../types';
import AppleIcon from '../assets/images/red-apple.svg';

import { hasGameEnded, clearCanvas } from '.';

const drawFood = (foodX: number, foodY: number) => {
  const { canvasContext } = useCanvasStore?.getState?.() ?? {};
  // draw the food on the canvas

  const appleSvgImage = new Image();
  appleSvgImage.src = AppleIcon;

  appleSvgImage.onload = () => {
    if (canvasContext) {
      canvasContext.drawImage(appleSvgImage, foodX, foodY, 20, 20);
    }
  };
};

export const generateFoodForSnake = (snake: SnakeCoordinate[]) => {
  const { setFood } = useSnakeStore?.getState?.() ?? {};
  // random coordinates for food in the canvas
  const foodX = Math.round((Math.random() * (CANVAS_WIDTH - 20)) / 20) * 20;
  const foodY = Math.round((Math.random() * (CANVAS_HEIGHT - 20)) / 20) * 20;

  // verifying if the generated food is at where the snake is currently

  snake.forEach((snakeCoordinate) => {
    if (snakeCoordinate.x === foodX && snakeCoordinate.y === foodY) {
      generateFoodForSnake?.(snake);
      return;
    }
  });

  setFood({ foodX, foodY });
  drawFood(foodX, foodY);
};

const getHorizontalVertivalVelocityForSnake = (direction: string) => {
  let dx = 20;
  let dy = 0;

  switch (direction) {
    case RIGHT:
      dx = 20;
      dy = 0;
      break;
    case LEFT:
      dx = -20;
      dy = 0;
      break;
    case UP:
      dx = 0;
      dy = -20;
      break;
    case DOWN:
      dx = 0;
      dy = 20;
      break;
  }

  return { dx, dy };
};

export const drawSnake = (
  canvasContext: CanvasRenderingContext2D,
  snake: SnakeCoordinate[]
) => {
  const appleSvgImage = new Image();
  appleSvgImage.src = AppleIcon;

  appleSvgImage.onload = () => {
    if (canvasContext) {
      snake?.forEach((snakeCoordinate) => {
        canvasContext.drawImage(
          appleSvgImage,
          snakeCoordinate.x,
          snakeCoordinate.y,
          20,
          20
        );
      });
    }
  };
};

export const moveSnake = () => {
  const { canvasContext } = useCanvasStore?.getState?.() ?? {};

  const { snake, score, direction, timer, food, setSnake, setScore } =
    useSnakeStore?.getState?.() ?? {};

  if (canvasContext) {
    if (hasGameEnded(snake[0])) {
      clearInterval(timer);
      console.log('game over');
      return;
    }

    const snakeCoordinate = [...snake];

    const { dx, dy } = getHorizontalVertivalVelocityForSnake(direction);

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    console.log(head);

    // adds the new head in front of the snake
    snakeCoordinate.unshift(head);

    if (head.x === food.foodX && head.y === food.foodY) {
      // snake has eaten the food and we want to generate a new food position
      generateFoodForSnake(snakeCoordinate);
      setScore(score + 10);
    } else {
      // removes the tail
      snakeCoordinate.pop();
    }

    setSnake(snakeCoordinate);

    // clears the canvas to re-draw the snake
    clearCanvas();

    drawSnake(canvasContext, snakeCoordinate);
    drawFood(food.foodX, food.foodY);
  }
};
