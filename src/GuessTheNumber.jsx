import React, { useState } from 'react';
import './GuessTheNumber.css';

const GuessTheNumber = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess < randomNumber) {
      setMessage('Too low! Try again.');
    } else if (userGuess > randomNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
    }

    setGuess('');
  };

  const handleReset = () => {
    setRandomNumber(generateRandomNumber());
    setGuess('');
    setMessage('');
    setAttempts(0);
  };

  return (
    <div className="guess-the-number">
      <h1>Guess the Number</h1>
      <p>I'm thinking of a number between 1 and 1000. Can you guess it?</p>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="number"
          value={guess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
        />
        <button type="submit">Guess</button>
      </form>
      <p>{message}</p>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default GuessTheNumber;