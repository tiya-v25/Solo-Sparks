import React from 'react';

const QuestDisplay = ({ quest }) => {
  return (
    <div className="quest-display">
      <h3>Your Quest:</h3>
      <p>{quest}</p>
    </div>
  );
};

export default QuestDisplay;

