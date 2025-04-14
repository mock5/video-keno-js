import '../styles/PayoutTable.css';
import { GAME_STATES } from '../utils/gameConstants';

const PayoutTable = ({ spotCount, betAmount, matches, gameState }) => {
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

  return (
    <div className="payout-table casino-style">
      <div className="payout-header">
        <div className="payout-title">HITS</div>
        <div className="payout-title">WIN</div>
      </div>
      <div className="payout-content">
        {Object.entries(currentPayoutTable).map(([catch_count, multiplier]) => {
          // Check if this row should be highlighted (matches the current win)
          const isWinningRow = gameState === GAME_STATES.RESULTS && parseInt(catch_count) === matches;

          return (
            <div key={catch_count} className={`payout-row ${isWinningRow ? 'winning-row' : ''}`}>
              <div className="payout-catch">{catch_count}</div>
              <div className="payout-amount">{multiplier * betAmount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayoutTable;
