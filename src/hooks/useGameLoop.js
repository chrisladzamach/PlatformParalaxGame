import { useState, useEffect, useRef, useCallback } from 'react';
import { checkCollision, generateObstacle, saveHighScore } from '../utils/gameUtils';

export const useGameLoop = () => {
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [bgOffset, setBgOffset] = useState(0);
  
  const gameLoopRef = useRef();
  const lastObstacleRef = useRef(0);
  const jumpTimeRef = useRef(0);
  
  // Initialize high score
  useEffect(() => {
    const saved = localStorage.getItem('pixelRunnerHighScore');
    setHighScore(saved ? parseInt(saved, 10) : 0);
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'playing' && !isJumping) {
      setIsJumping(true);
      setPlayerY(60);
      jumpTimeRef.current = Date.now();
      
      // Return to ground after jump duration
      setTimeout(() => {
        setIsJumping(false);
        setPlayerY(0);
      }, 500);
    }
  }, [gameState, isJumping]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setPlayerY(0);
    setIsJumping(false);
    setObstacles([]);
    setBgOffset(0);
    lastObstacleRef.current = 0;
  }, []);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
    const isNewHighScore = saveHighScore(score);
    if (isNewHighScore) {
      setHighScore(score);
    }
  }, [score]);

  const resetGame = useCallback(() => {
    setGameState('waiting');
    setScore(0);
    setPlayerY(0);
    setIsJumping(false);
    setObstacles([]);
    setBgOffset(0);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      setScore(prev => prev + 1);
      setBgOffset(prev => prev - 5);
      
      // Generate obstacles
      const now = Date.now();
      if (now - lastObstacleRef.current > 1500 + Math.random() * 1000) {
        setObstacles(prev => [...prev, generateObstacle()]);
        lastObstacleRef.current = now;
      }
      
      // Move obstacles and check collisions
      setObstacles(prev => {
        const updated = prev
          .map(obstacle => ({ ...obstacle, x: obstacle.x - obstacle.speed }))
          .filter(obstacle => obstacle.x > -obstacle.width);
        
        // Check collision with player
        const playerRect = {
          x: window.innerWidth / 2 - 10,
          y: 60 - playerY,
          width: 20,
          height: 30
        };
        
        const collision = updated.some(obstacle => 
          checkCollision(playerRect, obstacle)
        );
        
        if (collision && !isJumping) {
          gameOver();
        }
        
        return updated;
      });
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, playerY, isJumping, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'waiting') {
          startGame();
        } else if (gameState === 'playing') {
          jump();
        }
      }
    };

    const handleClick = () => {
      if (gameState === 'waiting') {
        startGame();
      } else if (gameState === 'playing') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [gameState, jump, startGame]);

  return {
    gameState,
    score,
    highScore,
    playerY,
    isJumping,
    obstacles,
    bgOffset,
    startGame,
    resetGame,
    jump
  };
};