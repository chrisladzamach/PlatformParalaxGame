import React from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import Background from './Background';
import Ground from './Ground';
import Player from './Player';
import Obstacles from './Obstacles';
import UI from './UI';

const Game = () => {
  const {
    gameState,
    score,
    highScore,
    playerY,
    isJumping,
    obstacles,
    bgOffset,
    resetGame
  } = useGameLoop();

  return (
    <div className="game-container">
      <Background offset={bgOffset} />
      <Ground offset={bgOffset} />
      <Player y={playerY} isJumping={isJumping} />
      <Obstacles obstacles={obstacles} />
      <UI score={score} highScore={highScore} />
      
      {gameState === 'waiting' && (
        <div className="start-message">
          Click or press SPACE to start!
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;