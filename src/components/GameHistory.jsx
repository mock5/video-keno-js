import { useState } from 'react';
import '../styles/GameHistory.css';

const GameHistory = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="game-history">
      <button 
        className="history-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide History' : 'Show History'}
      </button>
      
      {isOpen && (
        <div className="history-content">
          <h2>Game History</h2>
          
          {history.length === 0 ? (
            <p>No games played yet.</p>
          ) : (
            <div className="history-list">
              {history.map((game, index) => (
                <div key={index} className="history-item">
                  <div className="history-game-number">Game #{history.length - index}</div>
                  <div className="history-details">
                    <p>Selected: {game.selectedNumbers.join(', ')}</p>
                    <p>Matched: {game.matches} numbers</p>
                    <p>Bet: ${game.betAmount}</p>
                    <p className={game.payout > 0 ? 'win' : ''}>
                      {game.payout > 0 ? `Won: $${game.payout}` : 'No win'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameHistory;
