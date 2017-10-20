// import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import InitialState from '../../../initial-state';

export default combineReducers({
  ownedPlayers: (state = InitialState.get('ownedPlayers'), action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
});

