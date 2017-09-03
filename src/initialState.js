import Immutable from 'immutable';

export default Immutable.fromJS(
  {
    initialLoaded: false,
    userData: {},
    loadingMessages: [],
    navigation: { open: true, disabledUrls: [] },
  },
);
