// Game.tsx
import React, { useState, useEffect } from 'react';



// type Score = {
//   username: string;
//   highestScore: number;
// };

const Game: React.FC = () => {
  // const [scores, setScores] = useState<Score[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioFiles] = useState([
    "audio/clip1.mp3",
    "audio/clip2.mp3",
    // ...
  ]);
  const [userGuess, setUserGuess] = useState("");

  useEffect(() => {
    const newAudio = new Audio(audioFiles[currentTrackIndex]);
    newAudio.play();

    const timeout = setTimeout(() => {
      newAudio.pause();
    }, 3000);

    return () => {
      clearTimeout(timeout);
      newAudio.pause();
    };
  }, [currentTrackIndex, audioFiles]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % audioFiles.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check guess against correct answer logic here
    const correctAnswer = "Some song"; // Placeholder for correct answer logic

    if (userGuess.toLowerCase() === correctAnswer.toLowerCase()) {
      alert("Correct!");

      // Update the scoreboard by adding a new score entry
    //   setScores((prevScores) => [
    //     ...prevScores,
    //     { username: "Player", highestScore: 1 }, // Change to logic based on user's identity and performance
    //   ]);
    // } else {
    //   alert("Incorrect!");
    }

    handleNextTrack();
    setUserGuess("");
  };

  return (
    <div>
      <h2>Guess the Song!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Your guess"
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleNextTrack}>Next Clip</button>

      {/* Display the scoreboard */}
      {/* <Scoreboard scores={scores} /> */}
    </div>
  );
};

export default Game;
