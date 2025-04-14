/**
 * Game constants for the Keno game
 */

// Maximum number of spots that can be selected
export const MAX_SELECTABLE_SPOTS = 10;

// Number of spots drawn in each game
export const DRAWN_SPOTS_COUNT = 20;

// Maximum bet amount
export const MAX_BET_AMOUNT = 10;

// Default starting credits
export const DEFAULT_CREDITS = 100;

// Drawing speed levels in milliseconds
export const DRAWING_SPEEDS = {
  SLOW: 200,   // Level 1
  MEDIUM: 100, // Level 2
  FAST: 50     // Level 3
};

// Game states
export const GAME_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  RESULTS: 'results'
};

// Auto-play delay in seconds
export const AUTO_PLAY_DELAY = 1;

// Auto-play options
export const AUTO_PLAY_OPTIONS = [5, 10, 25, 50, 100];
