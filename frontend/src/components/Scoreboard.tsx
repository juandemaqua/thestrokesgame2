import React from 'react';

type ScoreboardProps = {
  username: string;
  highestScore: number;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ username, highestScore }) => {
  return (
    <div style={{ border: '1px solid #000', padding: '10px', width: '200px' }}>
      <h2>Scoreboard</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Highest Score:</strong> {highestScore}</p>
    </div>
  );
};

export default Scoreboard;