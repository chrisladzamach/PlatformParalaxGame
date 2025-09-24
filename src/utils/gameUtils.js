// Utility functions for the game

export const getHighScore = () => {
  const saved = localStorage.getItem('pixelRunnerHighScore');
  return saved ? parseInt(saved, 10) : 0;
};

export const saveHighScore = (score) => {
  const currentHigh = getHighScore();
  if (score > currentHigh) {
    localStorage.setItem('pixelRunnerHighScore', score.toString());
    return true; // New high score
  }
  return false;
};

export const checkCollision = (player, obstacle) => {
  const playerRect = {
    left: player.x,
    right: player.x + player.width,
    top: player.y,
    bottom: player.y + player.height
  };
  
  const obstacleRect = {
    left: obstacle.x,
    right: obstacle.x + obstacle.width,
    top: obstacle.y,
    bottom: obstacle.y + obstacle.height
  };
  
  return !(
    playerRect.right < obstacleRect.left ||
    playerRect.left > obstacleRect.right ||
    playerRect.bottom < obstacleRect.top ||
    playerRect.top > obstacleRect.bottom
  );
};

export const generateObstacle = () => {
  return {
    id: Math.random(),
    x: window.innerWidth,
    y: 0,
    width: 20,
    height: 30,
    speed: 5
  };
};

export const generateCloud = () => {
  return {
    id: Math.random(),
    x: window.innerWidth + Math.random() * 200,
    y: Math.random() * 200 + 50,
    width: 40 + Math.random() * 40,
    height: 20 + Math.random() * 20,
    speed: 0.5 + Math.random() * 1
  };
};

export const generateMountain = () => {
  return {
    id: Math.random(),
    x: window.innerWidth + Math.random() * 200,
    y: 0,
    width: 100 + Math.random() * 150,
    height: 200 + Math.random() * 200,
    speed: 1 + Math.random() * 2
  };
};

export const generateTree = () => {
  return {
    id: Math.random(),
    x: window.innerWidth + Math.random() * 100,
    y: 0,
    speed: 5
  };
};