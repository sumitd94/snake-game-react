import React, { useEffect, useState } from 'react';
import './App.css';

import { CanvasBoard } from './Canvas';
import { useSnakeStore } from './store';
import { RIGHT, LEFT, UP, DOWN } from './AppConstants';
import { moveSnake } from './utils/snake';

import { generateFoodForSnake } from './utils/snake';

import InfoIcon from '@mui/icons-material/Info';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const App = () => {
  const { setDirection, setTimer, snake } = useSnakeStore?.getState?.() ?? {};

  const [score, setScore] = useState(0);

  const handleKeyDownEvent = ({ keyCode }: { keyCode: number }) => {
    switch (keyCode) {
      case 37:
        setDirection(LEFT);
        break;
      case 38:
        setDirection(UP);
        break;
      case 39:
        setDirection(RIGHT);
        break;
      case 40:
        setDirection(DOWN);
        break;
    }
  };

  useEffect(() => {
    document.onkeydown = handleKeyDownEvent;
    console.log('test');
    // generates Initial food for the snake
    generateFoodForSnake(snake);

    const timer = setInterval(() => {
      moveSnake(setScore);
    }, 600);

    // storing the timer so that we can clear it when the game ends
    setTimer(timer);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
    <div className='App flex justify-center w-4/5 m-auto h-screen items-center flex-col'>
      <div className='flex items-center justify-center'>
        <h1>Hola! Let's see how many apples can you eat</h1>
        <Tooltip title='Each apple you eat, your life span increases by 10 days'>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>{`Increased your life span by - ${score} Days`}</div>
      <CanvasBoard />
    </div>
  );
};

export default App;
