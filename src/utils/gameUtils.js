// Generate random numbers for the keno draw
export const generateDrawnNumbers = (count = 20) => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * 80) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

// Generate random numbers for quick pick
export const generateQuickPick = (count, maxNum = 80) => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * maxNum) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

// Calculate the number of matches between selected and drawn numbers
export const calculateMatches = (selectedNumbers, drawnNumbers) => {
  return selectedNumbers.filter(num => drawnNumbers.includes(num)).length;
};

// Calculate payout based on spots selected and matches
export const calculatePayout = (spotCount, matches, betAmount) => {
  // Payout tables based on the number of spots selected
  const payoutTables = {
    1: { 1: 3 },
    2: { 2: 12 },
    3: { 2: 2, 3: 42 },
    4: { 2: 1, 3: 5, 4: 120 },
    5: { 3: 2, 4: 18, 5: 800 },
    6: { 3: 1, 4: 4, 5: 80, 6: 1500 },
    7: { 3: 1, 4: 2, 5: 20, 6: 100, 7: 5000 },
    8: { 4: 2, 5: 10, 6: 50, 7: 1000, 8: 10000 },
    9: { 4: 1, 5: 5, 6: 25, 7: 200, 8: 4000, 9: 20000 },
    10: { 5: 2, 6: 15, 7: 50, 8: 500, 9: 5000, 10: 100000 }
  };

  // Get the payout table for the current spot count
  const currentPayoutTable = payoutTables[spotCount] || {};
  
  // Get the multiplier for the number of matches
  const multiplier = currentPayoutTable[matches] || 0;
  
  // Calculate the payout
  return multiplier * betAmount;
};
