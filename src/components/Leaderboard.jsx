import { useState, useEffect } from 'react'
import './Leaderboard.css'

const Leaderboard = () => {
  const [scores, setScores] = useState([])

  useEffect(() => {
    // Load scores from localStorage
    const storedScores = JSON.parse(localStorage.getItem('numberGameScores') || '[]')
    setScores(storedScores)
  }, [])

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      {scores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Attempts</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores
              .sort((a, b) => a.attempts - b.attempts)
              .slice(0, 10)
              .map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{score.playerName}</td>
                  <td>{score.attempts}</td>
                  <td>{new Date(score.date).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No scores yet. Be the first to play!</p>
      )}
    </div>
  )
}

export default Leaderboard