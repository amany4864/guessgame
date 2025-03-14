import { useState, useEffect } from 'react'
import './GuessGame.css'

const GuessGame = () => {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 1000) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('Make your first guess!')
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleGuess = (e) => {
    e.preventDefault()
    
    const userGuess = parseInt(guess)
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
      setMessage('Please enter a valid number between 1 and 1000')
      return
    }

    setAttempts(prev => prev + 1)

    if (userGuess === targetNumber) {
      setMessage(`🎉 Congratulations! You found the number in ${attempts + 1} tries!`)
      setGameOver(true)
    } else if (userGuess < targetNumber) {
      setMessage('Too low! Try a higher number')
    } else {
      setMessage('Too high! Try a lower number')
    }

    setGuess('')
  }

  const resetGame = () => {
    window.location.reload()
  }

  return (
    <div className="guess-game">
      <h1>Guess the Number</h1>
      <p className="instructions">
        I'm thinking of a number between 1 and 1000...
      </p>

      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          min="1"
          max="1000"
          disabled={gameOver}
        />
        <button type="submit" disabled={gameOver}>
          Guess
        </button>
      </form>

      <p className="message">{message}</p>
      <p className="attempts">Attempts: {attempts}</p>

      {gameOver && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  )
}

export default GuessGame