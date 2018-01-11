import Immutable from 'immutable';
// import { combineReducers } from 'redux-immutable';
import reduceReducers from 'reduce-reducers';
import epicFactory from '../../../modules/helper-modules/epic-factory';
import InitialState from '../../../initial-state';

export const fetchClubEpic = epicFactory('FETCH_CLUB', {
  url: 'private/club/retrieve/',
  method: 'GET',
});

export const updatePlayerEpic = epicFactory('UPDATE_PLAYER', {
  url: 'private/club/update-player/',
  method: 'POST',
});

export const updateTacticEpic = epicFactory('UPDATE_TACTIC', {
  url: 'private/club/update-tactic/',
  method: 'POST',
});

export default reduceReducers(
  (state = InitialState.get('clubData'), action) => {
    switch (action.type) {
      case 'FETCH_CLUB_ASYNC':
        return state.set('loadFlag', 0);
      case 'FETCH_CLUB_ASYNC_SUCCEED':
      case 'UPDATE_PLAYER_ASYNC_SUCCEED':
      case 'UPDATE_TACTIC_ASYNC_SUCCEED':
        return Immutable.fromJS(action.payload.clubData).set('loadFlag', 1);
      case 'LOGIN_ASYNC_SUCCEED':
        return InitialState.get('clubData').set('loadFlag', -2);
      case 'LOGOUT_ASYNC_SUCCEED':
        return InitialState.get('clubData').set('loadFlag', 1);
      case 'LOGIN_ASYNC_ERROR':
      case 'FETCH_CLUB_ASYNC_ERROR':
      case 'UPDATE_PLAYER_ASYNC_ERROR':
      case 'UPDATE_TACTIC_ASYNC_ERROR':
      case 'LOGOUT_ASYNC_ERROR':
        return state.set('loadFlag', -1);
      default:
        return state;
    }
  },
  // combineReducers({
  //   loadFlag: (state = false) => state,
  //   ownedPlayers: (state = InitialState.get('clubData').get('ownedPlayers'), action) => {
  //     switch (action.type) {
  //       case 'UPDATE_OWNED_PLAYERS_ASYNC_SUCCEED':
  //         return Immutable.fromJS(action.payload.ownedPlayers);
  //       default:
  //         return state;
  //     }
  //   },
  // }),
);

