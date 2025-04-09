# Las Vegas Video Keno Game

A web-based implementation of the classic casino video keno game, built with React and modern web technologies.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Controls](#game-controls)
- [Game Rules](#game-rules)
- [Technical Details](#technical-details)
- [Development](#development)
- [License](#license)

## Overview

This project is a faithful recreation of the classic Las Vegas video keno game found in casinos. Players can select numbers, place bets, and win based on how many of their selected numbers match the randomly drawn numbers.

## Features

- **Authentic Casino Experience**: Designed to look and feel like a real casino video keno machine
- **Number Selection**: Select up to 10 numbers on the 80-number board
- **Betting System**: Increase bet amount with each click, up to a maximum of 10 credits
- **Animated Drawing**: Watch as numbers are drawn with animated highlighting
- **Speed Control**: Three-level speed control for number drawing animation
- **Auto-Play**: Set the game to automatically play multiple rounds
- **Responsive Design**: Works on desktop and mobile devices
- **Dynamic Payouts**: Payout table adjusts based on the number of spots selected

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/keno.git
   cd keno
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## How to Play

1. **Select Numbers**: Click on the keno board to select up to 10 numbers
2. **Place Bet**: Use the BET ONE button to increase your bet (each click adds 1) or BET MAX to set the maximum bet
3. **Start Game**: Click the START button to begin the draw
4. **Watch the Draw**: 20 numbers will be randomly drawn
5. **Check Results**: Your winnings are based on how many of your selected numbers match the drawn numbers
6. **Play Again**: Clear the board or keep your selections for another round

## Game Controls

### Main Controls

- **START**: Begins the game, drawing 20 random numbers
- **BET ONE**: Increases bet by 1 credit (up to 10)
- **BET MAX**: Sets bet to maximum (10 credits)
- **CLEAR**: Clears all selected numbers, drawn numbers, and resets statistics
- **QUICK PICK**: Automatically selects random numbers for you

### Special Controls

- **SPEED**: Controls the drawing animation speed

  - Level 1: Slow drawing speed
  - Level 2: Medium drawing speed
  - Level 3: Fast drawing speed

- **AUTO PLAY**: Automatically plays multiple games
  - Select the number of games (5, 10, 25, 50, or 100)
  - Click START AUTO to begin
  - Click STOP to end auto-play at any time

## Game Rules

1. Select between 1 and 10 numbers (spots) from the board of 80 numbers
2. The game will randomly draw 20 numbers
3. Your payout is based on how many of your selected numbers match the drawn numbers
4. The more numbers you match, the higher your payout
5. Payouts vary based on the number of spots you select and the number of matches

### Payout Table

The payout table shows potential winnings based on:

- Number of spots selected (1-10)
- Number of spots hit (matched)
- Current bet amount

For example, with 10 spots selected and a bet of 1 credit:

- 5 hits pays 2 credits
- 6 hits pays 15 credits
- 7 hits pays 50 credits
- 8 hits pays 500 credits
- 9 hits pays 5,000 credits
- 10 hits pays 100,000 credits

## Technical Details

### Technologies Used

- **React**: Frontend framework
- **Vite**: Build tool and development server
- **CSS**: Custom styling with responsive design
- **JavaScript (ES6+)**: Game logic and animations

### Project Structure

- `src/components/`: React components for game elements
- `src/styles/`: CSS files for styling components
- `src/utils/`: Utility functions for game logic
- `public/`: Static assets

### Key Components

- **KenoBoard**: The main game board with 80 numbers
- **PayoutTable**: Displays potential winnings
- **BetPanel**: Controls for betting
- **AutoPlayPanel**: Controls for auto-play functionality

## Development

### Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run preview`: Locally preview the production build

### Adding Features

To add new features:

1. Create new components in the `src/components/` directory
2. Add styling in the `src/styles/` directory
3. Update game logic in the appropriate files
4. Import and use your new components in `App.jsx`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created for entertainment purposes only. This game does not involve real money gambling.
