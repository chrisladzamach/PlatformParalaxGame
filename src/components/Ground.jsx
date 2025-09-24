import React, { useState, useEffect } from 'react';

const Ground = ({ offset }) => {
  const [trees, setTrees] = useState([]);

  // Initialize trees
  useEffect(() => {
    const initialTrees = [];
    for (let i = 0; i < 50; i++) {
      initialTrees.push({
        id: i,
        x: i * 40 + Math.random() * 20
      });
    }
    setTrees(initialTrees);
  }, []);

  return (
    <div 
      className="ground-container"
      style={{ 
        transform: `translateX(${offset}px)` 
      }}
    >
      {/* Main ground */}
      <div className="ground" />
      
      {/* Trees */}
      <div className="trees">
        {trees.map(tree => (
          <div
            key={tree.id}
            className="tree"
            style={{
              left: `${tree.x}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Ground;