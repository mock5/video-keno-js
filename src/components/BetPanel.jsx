import '../styles/BetPanel.css';
import { MAX_BET_AMOUNT, MAX_SELECTABLE_SPOTS, GAME_STATES } from '../utils/gameConstants';

const BetPanel = ({
  betAmount,
  setBetAmount,
  selectedNumbers,
  setSelectedNumbers,
  setMaxSelections,
  gameState,
  credits,
  onQuickPick,
  setDrawnNumbers,
  setMatches,
  setPayout
}) => {

  const handleBetOneClick = () => {
    if (gameState !== GAME_STATES.PLAYING) {
      // Increase bet by 1, up to max
      setBetAmount(prev => Math.min(prev + 1, MAX_BET_AMOUNT));
    }
  };

  const handleBetMaxClick = () => {
    if (gameState !== GAME_STATES.PLAYING) {
      // Set bet to maximum
      setBetAmount(MAX_BET_AMOUNT);
    }
  };

  const handleClear = () => {
    if (gameState !== GAME_STATES.PLAYING) {
      // Clear selected numbers
      setSelectedNumbers([]);
      // Reset maxSelections to default
      setMaxSelections(MAX_SELECTABLE_SPOTS);
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
          disabled={gameState === GAME_STATES.PLAYING || credits < 1 || betAmount >= MAX_BET_AMOUNT}
        >
          BET ONE
        </button>

        <button
          className="bet-max-btn"
          onClick={handleBetMaxClick}
          disabled={gameState === GAME_STATES.PLAYING || credits < MAX_BET_AMOUNT || betAmount === MAX_BET_AMOUNT}
        >
          BET MAX
        </button>
      </div>

      <div className="action-buttons">
        <button
          className="quick-pick-btn"
          onClick={onQuickPick}
          disabled={gameState === GAME_STATES.PLAYING}
        >
          QUICK PICK
        </button>

        <button
          className="clear-btn"
          onClick={handleClear}
          disabled={gameState === GAME_STATES.PLAYING || selectedNumbers.length === 0}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default BetPanel;
