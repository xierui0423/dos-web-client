import Immutable from 'immutable';

export default Immutable.fromJS(
  {
    loadingMessages: [],
    userData: { loadFlag: -2 },
    marketData: { loadFlag: -2 },
    clubData: {
      loadFlag: -2, // -2 not loaded, -1 loading error, 0 loading, 1 loading succeeded
      players: [],
      tactic: {
        formation: 0,
        // 0 541, 1 532, 2 451, 3 442, 4 433, 5, 361, 6 352, 7 343
        goalKeepers: [],
        attackers: [],
        midfielders: [],
        defenders: [],
      },
    },
  },
);
