import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SNAKE } from '../AppConstants';
import { SnakeCoordinate } from '../types';

interface SnakeState {
  snake: SnakeCoordinate[];
  food: { foodX: number; foodY: number };
  dx: number;
  dy: number;
  direction: string;
  timer?: NodeJS.Timer;
  score: number;
  setSnake: (value: SnakeCoordinate[]) => void;
  setDx: (value: number) => void;
  setDy: (value: number) => void;
  setDirection: (value: string) => void;
  setTimer: (value: NodeJS.Timer) => void;
  setFood: (food: { foodX: number; foodY: number }) => void;
  setScore: (value: number) => void;
}

const useSnakeStore = create<SnakeState>()(
  devtools(
    (set) => ({
      snake: SNAKE,
      dx: 20,
      dy: 0,
      direction: 'RIGHT',
      food: { foodX: 0, foodY: 0 },
      score: 0,
      setSnake: (value): void => set({ snake: value }),
      setDx: (value): void => set({ dx: value }),
      setDy: (value): void => set({ dy: value }),
      setDirection: (value): void => set({ direction: value }),
      setTimer: (value): void => set({ timer: value }),
      setFood: (value): void => set({ food: value }),
      setScore: (value): void => set({ score: value }),
    }),
    { enabled: true }
  )
);

export default useSnakeStore;
