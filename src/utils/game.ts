import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../AppConstants';

import { SnakeCoordinate } from '../types';
export const hasGameEnded = (snakeHead: SnakeCoordinate) => {
  const hasHitLeftWall = snakeHead.x <= 0;
  const hasHitRightWall = snakeHead.x >= CANVAS_WIDTH - 20;

  const hasHitTopWall = snakeHead.y <= 0;
  const hasHitBottomWall = snakeHead.y >= CANVAS_HEIGHT - 20;

  // returns true if snake hits any of the walls
  return hasHitLeftWall || hasHitRightWall || hasHitTopWall || hasHitBottomWall;
};
