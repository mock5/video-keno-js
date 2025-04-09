import { useState } from 'react';
import '../styles/AutoPlayPanel.css';

const AutoPlayPanel = ({
  onStart,
  onStop,
  isAutoPlaying,
  gameState,
  selectedNumbers,
  credits,
  betAmount,
  autoPlayCount
}) => {
  const [selectedCount, setSelectedCount] = useState(5);

  const autoPlayOptions = [5, 10, 25, 50, 100];

  const handleCountChange = (count) => {
    setSelectedCount(count);
  };

  const canStartAutoPlay =
    gameState !== 'playing' &&
    selectedNumbers.length > 0 &&
    credits >= betAmount &&
    !isAutoPlaying;

  return (
    <div className="auto-play-panel casino-style">
      {!isAutoPlaying ? (
        <div className="auto-play-settings">
          <div className="auto-play-header">
            <span>AUTO PLAY</span>
          </div>

          <div className="auto-play-controls">
            <div className="count-options">
              {autoPlayOptions.map(count => (
                <button
                  key={count}
                  className={selectedCount === count ? 'active' : ''}
                  onClick={() => handleCountChange(count)}
                  disabled={!canStartAutoPlay}
                >
                  {count}
                </button>
              ))}
            </div>

            {/* Delay slider removed - fixed at 1 second */}

            <button
              className="start-auto-play"
              onClick={() => onStart(selectedCount)}
              disabled={!canStartAutoPlay}
            >
              START AUTO
            </button>
          </div>
        </div>
      ) : (
        <div className="auto-play-active">
          <div className="auto-play-status">
            <span>AUTO PLAY: {autoPlayCount}</span>
          </div>
          <button
            className="stop-auto-play"
            onClick={onStop}
          >
            STOP
          </button>
        </div>
      )}
    </div>
  );
};

export default AutoPlayPanel;
