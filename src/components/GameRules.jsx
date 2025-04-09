import { useState } from 'react';
import '../styles/GameRules.css';

const GameRules = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="game-rules">
      <button 
        className="rules-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Rules' : 'Show Rules'}
      </button>
      
      {isOpen && (
        <div className="rules-content">
          <h2>Video Keno Rules</h2>
          <ol>
            <li>Select between 1 and 10 numbers (spots) from the board of 80 numbers.</li>
            <li>Choose your bet amount.</li>
            <li>Press "Play" to start the game.</li>
            <li>The game will randomly draw 20 numbers.</li>
            <li>Your payout is based on how many of your selected numbers match the drawn numbers.</li>
            <li>The more numbers you match, the higher your payout.</li>
            <li>Payouts vary based on the number of spots you select and the number of matches.</li>
          </ol>
          
          <h3>Quick Tips</h3>
          <ul>
            <li>Use "Quick Pick" to randomly select numbers.</li>
            <li>The "Clear" button removes all your selections.</li>
            <li>Check the payout table to see potential winnings.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameRules;
