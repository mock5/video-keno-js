/**
 * Generate a set of unique random numbers
 * @param {number} count - Number of random numbers to generate
 * @param {number} maxNum - Maximum possible number (default: 80)
 * @returns {number[]} Array of unique random numbers
 */
const generateRandomNumbers = (count, maxNum = 80) => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * maxNum) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

// Generate random numbers for the keno draw (always 20 numbers)
export const generateDrawnNumbers = () => {
  return generateRandomNumbers(20);
};

// Generate random numbers for quick pick (variable count)
export const generateQuickPick = (count) => {
  return generateRandomNumbers(count);
};

/**
 * Calculate the number of matches between selected and drawn numbers
 * @param {number[]} selectedNumbers - Numbers selected by the player
 * @param {number[]} drawnNumbers - Numbers drawn in the game
 * @returns {number} Count of matching numbers
 */
export const calculateMatches = (selectedNumbers, drawnNumbers) => {
  return selectedNumbers.filter(num => drawnNumbers.includes(num)).length;
};

/**
 * Standard keno payout tables based on the number of spots selected
 * Each key represents the number of spots selected, and the inner object
 * maps the number of matches to the payout multiplier
 */
const PAYOUT_TABLES = {
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

/**
 * Calculate payout based on spots selected and matches
 * @param {number} spotCount - Number of spots selected by the player
 * @param {number} matches - Number of matches between selected and drawn numbers
 * @param {number} betAmount - Amount bet by the player
 * @returns {number} The calculated payout amount
 */
export const calculatePayout = (spotCount, matches, betAmount) => {
  // Get the payout table for the current spot count
  const currentPayoutTable = PAYOUT_TABLES[spotCount] || {};

  // Get the multiplier for the number of matches
  const multiplier = currentPayoutTable[matches] || 0;

  // Calculate the payout
  return multiplier * betAmount;
};
