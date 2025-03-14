import { useState, useEffect } from 'react'
import './GuessGame.css'
import Leaderboard from './Leaderboard'

const upperlimit = 100
const lowerlimit = 1
const GuessGame = () => {
  const [targetNumber] = useState(() => Math.floor(Math.random() * upperlimit) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('Make your first guess!')
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [guessHistory, setGuessHistory] = useState([])

  // ... other functions remain the same ...

  const handleGuess = (e) => {
    e.preventDefault()
    
    const userGuess = parseInt(guess)
    
    if (isNaN(userGuess) || userGuess < lowerlimit || userGuess > upperlimit) {
      setMessage('Please enter a valid number between 1 and 100')
      return
    }

    setAttempts(prev => prev + 1)
    setGuessHistory(prev => [...prev, userGuess])

    if (userGuess === targetNumber) {
      setMessage(`🎉 Congratulations! Your guess ${userGuess} is correct! You found the number in ${attempts + 1} tries!`)
      setGameOver(true)
      setShowNameInput(true)
    } else if (userGuess < targetNumber) {
      setMessage(`Your guess ${userGuess} is too low! Try a higher number`)
    } else {
      setMessage(`Your guess ${userGuess} is too high! Try a lower number`)
    }

    setGuess('')
  }

  // Add a function to display guess history
  const renderGuessHistory = () => {
    if (guessHistory.length === 0) return null;

    return (
      <div className="guess-history">
        <h3>Previous Guesses</h3>
        <div className="guess-list">
          {guessHistory.map((g, index) => (
            <span key={index} className="guess-item">
              {g}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="guess-game">
      <h1>Guess the Number</h1>
      <p className="instructions">
        I'm thinking of a number between 1 and 100...
      </p>

      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          min="1"
          max="100"
          disabled={gameOver}
        />
        <button type="submit" disabled={gameOver}>
          Guess
        </button>
      </form>

      <p className="message">{message}</p>
      <p className="attempts">Attempts: {attempts}</p>

      {renderGuessHistory()}

      {showNameInput && (
        <form onSubmit={handleNameSubmit} className="name-form">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            required
          />
          <button type="submit">Save Score</button>
        </form>
      )}

      {gameOver && !showNameInput && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}

      <Leaderboard />
    </div>
  )
}

export default GuessGame