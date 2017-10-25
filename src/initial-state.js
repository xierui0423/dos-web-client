import Immutable from 'immutable';

export default Immutable.fromJS(
  {
    loadingMessages: [],
    userData: { loadFlag: -2 },
    marketData: { loadFlag: -2 },
    clubData: { loadFlag: -2, players: [] },
  },
);
