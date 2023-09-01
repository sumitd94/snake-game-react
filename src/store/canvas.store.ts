import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CanvasState {
  canvasContext?: CanvasRenderingContext2D;
  setCanvasContext: (value: CanvasRenderingContext2D) => void;
}

const useCanvasStore = create<CanvasState>()(
  devtools(
    (set) => ({
      setCanvasContext: (value): void => set({ canvasContext: value }),
    }),
    { enabled: true }
  )
);

export default useCanvasStore;
