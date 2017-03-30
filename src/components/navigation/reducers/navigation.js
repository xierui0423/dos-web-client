// import Immutable from 'immutable';
import InitialState from '../../../initialState';

export default (state = InitialState.get('navigation'), action) => {
  switch (action.type) {
        // case 'LOCATION_CHANGE':
        //     return state.set('url', '/test');
    default:
      return state;
  }
};

