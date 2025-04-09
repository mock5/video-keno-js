import '../styles/BetPanel.css';

const BetPanel = ({
  betAmount,
  setBetAmount,
  selectedNumbers,
  setSelectedNumbers,
  maxSelections,
  setMaxSelections,
  onPlay,
  gameState,
  credits,
  onQuickPick,
  setDrawnNumbers,
  setMatches,
  setPayout
}) => {

  const handleBetOneClick = () => {
    if (gameState !== 'playing') {
      // Increase bet by 1, up to max of 10
      setBetAmount(prev => Math.min(prev + 1, 10));
    }
  };

  const handleBetMaxClick = () => {
    if (gameState !== 'playing') {
      // Set bet to maximum (10)
      setBetAmount(10);
    }
  };

  const handleClear = () => {
    if (gameState !== 'playing') {
      // Clear selected numbers
      setSelectedNumbers([]);
      // Reset maxSelections to default 10
      setMaxSelections(10);
      // Clear drawn numbers as well
      setDrawnNumbers([]);
      // Reset matches and payout
      setMatches(0);
      setPayout(0);
    }
  };

  return (
    <div className="bet-panel casino-style">
      <div className="bet-buttons">
        <button
          className="bet-one-btn"
          onClick={handleBetOneClick}
          disabled={gameState === 'playing' || credits < 1 || betAmount >= 10}
        >
          BET ONE
        </button>

        <button
          className="bet-max-btn"
          onClick={handleBetMaxClick}
          disabled={gameState === 'playing' || credits < 10 || betAmount === 10}
        >
          BET MAX
        </button>
      </div>

      <div className="action-buttons">
        <button
          className="quick-pick-btn"
          onClick={onQuickPick}
          disabled={gameState === 'playing'}
        >
          QUICK PICK
        </button>

        <button
          className="clear-btn"
          onClick={handleClear}
          disabled={gameState === 'playing' || selectedNumbers.length === 0}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default BetPanel;
