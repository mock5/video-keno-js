import { useState, useEffect, useRef } from 'react';
import '../styles/KenoBoard.css';

const KenoBoard = ({
  selectedNumbers,
  setSelectedNumbers,
  maxSelections,
  drawnNumbers,
  gameState,
  setMaxSelections,
  drawingSpeed
}) => {
  // Create an array of numbers 1-80
  const numbers = Array.from({ length: 80 }, (_, i) => i + 1);

  // State for animated drawn numbers
  const [animatedDrawnNumbers, setAnimatedDrawnNumbers] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingTimerRef = useRef(null);

  // Effect to handle drawing animation
  useEffect(() => {
    // Clear any existing animation when drawn numbers change
    if (drawingTimerRef.current) {
      clearInterval(drawingTimerRef.current);
      drawingTimerRef.current = null;
    }

    // Reset animated numbers when game state changes
    if (gameState !== 'playing') {
      setAnimatedDrawnNumbers([]);
      setIsDrawing(false);
      return;
    }

    // Start animation when game state is 'playing'
    if (gameState === 'playing' && drawnNumbers.length > 0) {
      setIsDrawing(true);
      setAnimatedDrawnNumbers([]);

      let currentIndex = 0;
      // Set drawing interval based on speed level
      // Level 1 (slow): 200ms, Level 2 (medium): 100ms, Level 3 (fast): 50ms
      const drawingInterval = drawingSpeed === 1 ? 200 : drawingSpeed === 2 ? 100 : 50;

      // Animate drawing numbers one by one
      drawingTimerRef.current = setInterval(() => {
        if (currentIndex < drawnNumbers.length) {
          setAnimatedDrawnNumbers(prev => [...prev, drawnNumbers[currentIndex]]);
          currentIndex++;
        } else {
          // Animation complete
          clearInterval(drawingTimerRef.current);
          drawingTimerRef.current = null;
          setIsDrawing(false);
        }
      }, drawingInterval);
    }

    // Cleanup interval on unmount
    return () => {
      if (drawingTimerRef.current) {
        clearInterval(drawingTimerRef.current);
      }
    };
  }, [drawnNumbers, gameState]);

  const handleNumberClick = (number) => {
    // Only allow selection if game is not in progress
    if (gameState === 'playing') return;

    if (selectedNumbers.includes(number)) {
      // If number is already selected, remove it
      const newSelectedNumbers = selectedNumbers.filter(num => num !== number);
      setSelectedNumbers(newSelectedNumbers);

      // Update maxSelections based on the new count of selected numbers
      if (newSelectedNumbers.length > 0) {
        setMaxSelections(newSelectedNumbers.length);
      } else {
        // If no numbers are selected, set maxSelections to 10 (default)
        setMaxSelections(10);
      }
    } else {
      // If number is not selected, check if we've reached the max of 10
      if (selectedNumbers.length >= 10) {
        // Already have 10 numbers selected, don't add more
        return;
      }

      // Add the new number
      const newSelectedNumbers = [...selectedNumbers, number];
      setSelectedNumbers(newSelectedNumbers);

      // Update maxSelections to match the number of selected numbers
      setMaxSelections(newSelectedNumbers.length);
    }
  };

  const getNumberClass = (number) => {
    let classes = 'keno-number';

    if (selectedNumbers.includes(number)) {
      classes += ' selected';
    }

    // Use animated drawn numbers during drawing phase
    if (animatedDrawnNumbers.includes(number)) {
      classes += ' drawn';

      if (selectedNumbers.includes(number)) {
        classes += ' match';
      }
    } else if (!isDrawing && drawnNumbers.includes(number)) {
      // Show all drawn numbers after animation completes
      classes += ' drawn';

      if (selectedNumbers.includes(number)) {
        classes += ' match';
      }
    }

    // Add animation class for the most recently drawn number
    if (isDrawing && animatedDrawnNumbers.length > 0 &&
        animatedDrawnNumbers[animatedDrawnNumbers.length - 1] === number) {
      classes += ' drawing-animation';
    }

    // Add row class based on number range
    if (number <= 10) classes += ' row-1';
    else if (number <= 20) classes += ' row-2';
    else if (number <= 30) classes += ' row-3';
    else if (number <= 40) classes += ' row-4';
    else if (number <= 50) classes += ' row-5';
    else if (number <= 60) classes += ' row-6';
    else if (number <= 70) classes += ' row-7';
    else classes += ' row-8';

    return classes;
  };

  // Group numbers into rows for the casino-style layout
  const renderKenoGrid = () => {
    const rows = [];
    for (let i = 0; i < 8; i++) {
      const rowStart = i * 10 + 1;
      const rowEnd = rowStart + 9;
      const rowNumbers = numbers.filter(num => num >= rowStart && num <= rowEnd);

      rows.push(
        <div key={`row-${i+1}`} className={`keno-row row-${i+1}`}>
          {rowNumbers.map(number => (
            <div
              key={number}
              className={getNumberClass(number)}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="keno-board casino-style">
      <div className="keno-grid">
        {renderKenoGrid()}
      </div>
    </div>
  );
};

export default KenoBoard;
