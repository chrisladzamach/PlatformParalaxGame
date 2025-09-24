import React, { useState, useEffect } from 'react';

const Background = ({ offset }) => {
  const [mountains, setMountains] = useState([]);
  const [clouds, setClouds] = useState([]);

  // Initialize mountains and clouds
  useEffect(() => {
    const initialMountains = [];
    const initialClouds = [];
    
    // Generate mountains
    for (let i = 0; i < 8; i++) {
      initialMountains.push({
        id: i,
        x: i * 200,
        width: 150 + Math.random() * 100,
        height: 200 + Math.random() * 150,
        layer: Math.floor(i / 2) + 1
      });
    }
    
    // Generate clouds
    for (let i = 0; i < 6; i++) {
      initialClouds.push({
        id: i,
        x: i * 300 + Math.random() * 200,
        y: 50 + Math.random() * 150,
        width: 60 + Math.random() * 40,
        height: 30 + Math.random() * 20
      });
    }
    
    setMountains(initialMountains);
    setClouds(initialClouds);
  }, []);

  return (
    <div className="background">
      {/* Sun */}
      <div className="sun"></div>
      
      {/* Clouds */}
      <div 
        className="clouds"
        style={{ 
          transform: `translateX(${offset * 0.2}px)` 
        }}
      >
        {clouds.map(cloud => (
          <div
            key={cloud.id}
            className="cloud"
            style={{
              left: `${cloud.x}px`,
              top: `${cloud.y}px`,
              width: `${cloud.width}px`,
              height: `${cloud.height}px`
            }}
          />
        ))}
      </div>

      {/* Mountains */}
      <div 
        className="mountains"
        style={{ 
          transform: `translateX(${offset * 0.3}px)` 
        }}
      >
        {mountains.map(mountain => (
          <div
            key={mountain.id}
            className="mountain"
            style={{
              left: `${mountain.x}px`,
              width: `${mountain.width}px`,
              height: `${mountain.height}px`,
              opacity: 1 - (mountain.layer * 0.2),
              zIndex: 5 - mountain.layer
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;