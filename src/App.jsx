import { useState, useEffect, useRef } from 'react';
import './App.css';

// Import components
import KenoBoard from './components/KenoBoard';
import BetPanel from './components/BetPanel';
import ResultsDisplay from './components/ResultsDisplay';
import PayoutTable from './components/PayoutTable';
import GameRules from './components/GameRules';
import GameHistory from './components/GameHistory';
import AutoPlayPanel from './components/AutoPlayPanel';

// Import utilities
import { generateDrawnNumbers, generateQuickPick, calculateMatches, calculatePayout } from './utils/gameUtils';

function App() {
  // Game state
  const [gameState, setGameState] = useState('idle'); // idle, playing, results
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState(1);
  const [credits, setCredits] = useState(100);
  const [matches, setMatches] = useState(0);
  const [payout, setPayout] = useState(0);
  const [maxSelections, setMaxSelections] = useState(10);
  const [gameHistory, setGameHistory] = useState([]);
  const [drawingSpeed, setDrawingSpeed] = useState(1); // 1=slow, 2=medium, 3=fast

  // Auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayCount, setAutoPlayCount] = useState(0);
  const autoPlayDelay = 1; // Fixed at 1 second

  // Use refs to track current values in callbacks
  const isAutoPlayingRef = useRef(false);
  const autoPlayCountRef = useRef(0);
  const creditsRef = useRef(credits);

  // Keep refs in sync with state
  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
    autoPlayCountRef.current = autoPlayCount;
    creditsRef.current = credits;
  }, [isAutoPlaying, autoPlayCount, credits]);

  // Handle Quick Pick
  const handleQuickPick = () => {
    if (gameState !== 'playing') {
      const quickPickNumbers = generateQuickPick(maxSelections);
      setSelectedNumbers(quickPickNumbers);
    }
  };

  // Handle Play button click
  const handlePlay = () => {
    if (selectedNumbers.length === 0 || gameState === 'playing' || credits < betAmount) {
      return;
    }

    // Deduct bet amount from credits
    setCredits(credits - betAmount);

    // Set game state to playing
    setGameState('playing');

    // Clear previous drawn numbers and reset win value
    setDrawnNumbers([]);
    setPayout(0);
    setMatches(0);

    // Generate drawn numbers immediately but don't show results yet
    const drawn = generateDrawnNumbers();
    setDrawnNumbers(drawn);

    // The KenoBoard component will handle the animation of drawing numbers
    // We'll wait for the animation to complete (approximately)
    // Calculate animation duration based on drawing speed
    const drawingInterval = drawingSpeed === 1 ? 200 : drawingSpeed === 2 ? 100 : 50;
    const animationDuration = drawingInterval * 20 + 1000; // ms per number (20 numbers) + 1 second buffer

    // After animation completes, show results and handle payouts
    setTimeout(() => {
      // Calculate matches and payout
      const matchCount = calculateMatches(selectedNumbers, drawn);
      setMatches(matchCount);

      const payoutAmount = calculatePayout(selectedNumbers.length, matchCount, betAmount);
      setPayout(payoutAmount);

      // Add payout to credits
      setCredits(prev => prev + payoutAmount);

      // Add game to history
      setGameHistory(prev => [
        {
          selectedNumbers: [...selectedNumbers],
          drawnNumbers: [...drawn],
          matches: matchCount,
          betAmount,
          payout: payoutAmount
        },
        ...prev
      ]);

      // Set game state to results
      setGameState('results');

      // If auto-play is active, schedule the next game
      if (isAutoPlayingRef.current && autoPlayCountRef.current > 0) {
        setAutoPlayCount(prev => prev - 1);

        setTimeout(() => {
          // Check again using refs to get the most current values
          if (isAutoPlayingRef.current && creditsRef.current >= betAmount) {
            // Reset win value before starting next auto-play game
            setPayout(0);
            setMatches(0);
            handlePlay();
          } else {
            setIsAutoPlaying(false);
          }
        }, autoPlayDelay * 1000);
      } else if (autoPlayCountRef.current === 0 && isAutoPlayingRef.current) {
        setIsAutoPlaying(false);
      }
    }, animationDuration);
  };

  // Handle auto-play start
  const handleAutoPlayStart = (count) => {
    if (gameState !== 'playing' && selectedNumbers.length > 0 && credits >= betAmount) {
      // Set both state and ref
      setAutoPlayCount(count);
      autoPlayCountRef.current = count;

      setIsAutoPlaying(true);
      isAutoPlayingRef.current = true;

      handlePlay();
    }
  };

  // Handle auto-play stop
  const handleAutoPlayStop = () => {
    setIsAutoPlaying(false);
    isAutoPlayingRef.current = false;

    setAutoPlayCount(0);
    autoPlayCountRef.current = 0;
  };

  // Auto-play delay is now fixed at 1 second

  // Handle drawing speed change
  const handleSpeedChange = () => {
    // Cycle through 3 speed levels: 1 (slow) -> 2 (medium) -> 3 (fast) -> 1 (slow)
    setDrawingSpeed(prev => prev < 3 ? prev + 1 : 1);
  };

  return (
    <div className="keno-app casino-style">
      <main className="game-container">
        <div className="keno-main-layout">
          <div className="keno-top-section">
            <div className="ball-animation-container">
              {/* Ball animation placeholder */}
              <div className="ball-cage"></div>
            </div>

            <div className="game-stats">
              <div className="marked-display">
                <div className="stat-label">MARKED</div>
                <div className={`stat-value ${selectedNumbers.length >= 10 ? 'max-reached' : ''}`}>
                  {selectedNumbers.length}/10
                </div>
              </div>
              <div className="hit-display">
                <div className="stat-label">HIT</div>
                <div className="stat-value">{matches}</div>
              </div>
              <div className="win-display">
                <div className="stat-label">WIN</div>
                <div className="stat-value">${payout}</div>
              </div>
            </div>
          </div>

          <div className="keno-middle-section">
            <div className="payout-section">
              <PayoutTable
                spotCount={maxSelections}
                betAmount={betAmount}
              />
            </div>

            <div className="board-section">
              <KenoBoard
                selectedNumbers={selectedNumbers}
                setSelectedNumbers={setSelectedNumbers}
                maxSelections={maxSelections}
                setMaxSelections={setMaxSelections}
                drawnNumbers={drawnNumbers}
                gameState={gameState}
                drawingSpeed={drawingSpeed}
              />
            </div>
          </div>

          <div className="keno-bottom-section">
            <div className="game-controls">
              <button
                className={`speed-btn speed-level-${drawingSpeed}`}
                onClick={handleSpeedChange}
              >
                SPEED {drawingSpeed === 1 ? '>' : drawingSpeed === 2 ? '>>' : '>>>'}
              </button>

              <div className="bet-controls">
                <div className="bet-amount">
                  <div className="bet-label">BET</div>
                  <div className={`bet-value ${betAmount === 10 ? 'max-bet' : ''}`}>{betAmount}</div>
                </div>

                <BetPanel
                  betAmount={betAmount}
                  setBetAmount={setBetAmount}
                  selectedNumbers={selectedNumbers}
                  setSelectedNumbers={setSelectedNumbers}
                  maxSelections={maxSelections}
                  setMaxSelections={setMaxSelections}
                  onPlay={handlePlay}
                  gameState={gameState}
                  credits={credits}
                  onQuickPick={handleQuickPick}
                  setDrawnNumbers={setDrawnNumbers}
                  setMatches={setMatches}
                  setPayout={setPayout}
                />
              </div>

              <div className="credits-display">
                <div className="credit-label">CREDIT</div>
                <div className="credit-value">{credits}</div>
              </div>

              <button
                className="start-btn"
                onClick={handlePlay}
                disabled={gameState === 'playing' || selectedNumbers.length === 0 || credits < betAmount}
              >
                START
              </button>
            </div>

            <div className="auto-play-controls">
              <AutoPlayPanel
                onStart={handleAutoPlayStart}
                onStop={handleAutoPlayStop}
                isAutoPlaying={isAutoPlaying}
                gameState={gameState}
                selectedNumbers={selectedNumbers}
                credits={credits}
                betAmount={betAmount}
                autoPlayCount={autoPlayCount}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
