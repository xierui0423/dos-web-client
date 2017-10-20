import Immutable from 'immutable';

export default Immutable.fromJS(
  {
    initialLoaded: false,
    userData: {},
    loadingMessages: [],
    marketData: {},
    clubData: {
      ownedPlayers: [2, 5, 8],
    },
  },
);
