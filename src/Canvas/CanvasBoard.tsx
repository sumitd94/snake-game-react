import React, { useRef, useEffect } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../AppConstants';
import { drawSnake } from '../utils/snake';
import { useCanvasStore, useSnakeStore } from '../store';

const CanvasBoard = (): JSX.Element => {
  const canvasBoardRef = useRef<HTMLCanvasElement>(null);
  const { setCanvasContext } = useCanvasStore?.getState?.() ?? {};
  const { snake } = useSnakeStore?.getState?.() ?? {};

  useEffect(() => {
    const canvasContext = canvasBoardRef?.current?.getContext('2d');

    if (canvasContext) {
      // updates the store to use context elsewhere
      setCanvasContext(canvasContext);

      // color to fill the canvas drawing
      canvasContext.fillStyle = 'black';
      // colors the canvas border
      canvasContext.strokeStyle = 'white';

      // creates a filled rectangle to cover the entire canvas
      canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // draws a border around the canvas
      canvasContext.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // renders the snake into the canvas drawing
      drawSnake(canvasContext, snake);
    }
  }, []);

  return (
    <canvas
      ref={canvasBoardRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className='canvas-board rounded-2xl'
    />
  );
};

export default CanvasBoard;
