import '../styles/ResultsDisplay.css';

const ResultsDisplay = ({
  selectedNumbers,
  drawnNumbers,
  matches,
  payout,
  gameState,
  isAutoPlaying,
  autoPlayCount
}) => {
  // Calculate matches
  const matchedNumbers = selectedNumbers.filter(num => drawnNumbers.includes(num));

  return (
    <div className="results-display">
      {gameState === 'results' && (
        <>
          <h2>Results</h2>
          <div className="results-info">
            <p>Numbers Matched: {matches}</p>
            <p className="payout">Payout: ${payout}</p>
          </div>

          {matchedNumbers.length > 0 && (
            <div className="matched-numbers">
              <h3>Matched Numbers:</h3>
              <div className="number-list">
                {matchedNumbers.map(num => (
                  <span key={num} className="matched-number">{num}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {gameState === 'playing' && (
        <div className="drawing-animation">
          <h2>Drawing Numbers...</h2>
          {isAutoPlaying && (
            <p className="auto-play-indicator">Auto Play: {autoPlayCount} games remaining</p>
          )}
          <p className="drawing-instruction">Watch the numbers being drawn on the board</p>
        </div>
      )}

      {gameState === 'idle' && selectedNumbers.length > 0 && (
        <div className="instructions">
          <p>Select up to {selectedNumbers.length} numbers and press Play to start!</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
