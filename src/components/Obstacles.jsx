import React from 'react';

const Obstacles = ({ obstacles }) => {
  return (
    <div className="obstacles-container">
      {obstacles.map(obstacle => (
        <div
          key={obstacle.id}
          className="obstacle"
          style={{
            left: `${obstacle.x}px`,
            width: `${obstacle.width}px`,
            height: `${obstacle.height}px`
          }}
        />
      ))}
    </div>
  );
};

export default Obstacles;