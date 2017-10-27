import Immutable from 'immutable';

export default Immutable.fromJS(
  {
    loadingMessages: [],
    userData: { loadFlag: -2 },
    marketData: { loadFlag: -2 },
    clubData: {
      loadFlag: -2,
      players: [],
      tactic: {
        formation: 0,
        // 0 541, 1 532, 2 451, 3 442, 4 433, 5, 361, 6 352, 7 343
        attackers: [],
        midfielders: [],
        defenders: [],
      },
    },
  },
);
