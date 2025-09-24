import React from 'react';

const UI = ({ score, highScore }) => {
  const formatScore = (num) => {
    return num.toString().padStart(5, '0');
  };

  return (
    <div className="ui">
      <div className="score">
        {formatScore(score)}
      </div>
      <div className="high-score">
        HI {formatScore(highScore)}
      </div>
    </div>
  );
};

export default UI;