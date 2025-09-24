import React from 'react';

const Player = ({ y, isJumping }) => {
  return (
    <div 
      className={`player ${isJumping ? 'jumping' : ''}`}
      style={{
        bottom: `${60 + y}px`
      }}
    />
  );
};

export default Player;