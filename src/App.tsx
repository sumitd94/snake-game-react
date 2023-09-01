import React, { useEffect } from 'react';
import './App.css';

import { shallow } from 'zustand/shallow';
import { CanvasBoard } from './Canvas';
import { useSnakeStore } from './store';
import { RIGHT, LEFT, UP, DOWN } from './AppConstants';

import { generateFoodForSnake, moveSnake } from './utils/snake';
import { handleGameOverModalClose } from './utils';

import InfoIcon from '@mui/icons-material/Info';

import { Modal, Tooltip, IconButton, Typography, Box } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const { score, snake, setDirection, setTimer, gameOver } = useSnakeStore(
    (state) => ({
      setDirection: state.setDirection,
      setTimer: state.setTimer,
      snake: state.snake,
      score: state.score,
      gameOver: state.gameOver,
    }),
    shallow
  );

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
    // generates Initial food for the snake
    generateFoodForSnake(snake);

    const timer = setInterval(() => {
      moveSnake();
    }, 100);

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
        <Tooltip title='Each apple you eat, your healthy life span increases by 10 days'>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>{`Increased your life span by - ${score} Days`}</div>
      <CanvasBoard />
      <Modal
        open={gameOver}
        onClose={handleGameOverModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Oops!
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {score === 0
              ? 'Looks like you dont like apples, you were not able to increase your life span'
              : `Not bad, you were able to increase your life span by ${score} Days`}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
