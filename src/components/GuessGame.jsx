import { useState, useEffect } from 'react'
import './GuessGame.css'
import Leaderboard from './Leaderboard'

const GuessGame = () => {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1)
  console.log('Target Number:', targetNumber)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('Make your first guess!')
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [guessHistory, setGuessHistory] = useState([])

  // Add this function that was missing
  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (playerName.trim()) {
      saveScore(playerName.trim())
      setShowNameInput(false)
    }
  }

  const saveScore = (name) => {
    try {
      const newScore = {
        playerName: name,
        attempts: attempts,
        date: new Date().toISOString()
      }

      // Get existing scores
      const existingScores = JSON.parse(localStorage.getItem('numberGameScores') || '[]')
      
      // Add new score
      const updatedScores = [...existingScores, newScore]
        .sort((a, b) => a.attempts - b.attempts)
        .slice(0, 10) // Keep only top 10 scores

      // Save to localStorage
      localStorage.setItem('numberGameScores', JSON.stringify(updatedScores))
    } catch (error) {
      console.error('Error saving score:', error)
      setMessage('Error saving score. Please try again.')
    }
  }

  const handleGuess = (e) => {
    e.preventDefault()
    
    const userGuess = parseInt(guess)
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
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

  const renderGuessHistory = () => {
    if (guessHistory.length === 0) return null

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
    )
  }

  const resetGame = () => {
    // Use state updates instead of page reload for a smoother experience
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setMessage('Make your first guess!')
    setAttempts(0)
    setGameOver(false)
    setPlayerName('')
    setShowNameInput(false)
    setGuessHistory([])
  }

  // Add error boundary
  useEffect(() => {
    const handleError = (error) => {
      console.error('Game Error:', error)
      setMessage('An error occurred. Please try again.')
      setGameOver(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

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
          disabled={gameOver && !showNameInput}
        />
        <button type="submit" disabled={gameOver && !showNameInput}>
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