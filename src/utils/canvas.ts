import { useCanvasStore } from '../store';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../AppConstants';

export const clearCanvas = () => {
  const { canvasContext } = useCanvasStore?.getState?.() ?? {};

  if (canvasContext) {
    canvasContext.fillStyle = 'black';
    canvasContext.strokeStyle = 'white';
    canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvasContext.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};
