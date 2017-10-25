import Immutable from 'immutable';
import epicFactory from '../../../modules/helper-modules/epic-factory';
import InitialState from '../../../initial-state';

export const loginEpic = epicFactory('LOGIN', {
  url: 'public/account/user/login/',
  method: 'POST',
  inputHandler: data => data.toJSON(),
}, '/user');

export const fetchUserEpic = epicFactory('FETCH_USER', {
  url: 'private/account/user/retrieve/',
  method: 'GET',
});

export const logoutEpic = epicFactory('LOGOUT', {
  url: 'private/account/user/logout/',
  method: 'POST',
}, '/login');

export default (state = InitialState.get('userData'), action) => {
  switch (action.type) {
    case 'FETCH_USER_ASYNC':
      return state.set('loadFlag', 0);
    case 'FETCH_USER_ASYNC_SUCCEED':
    case 'LOGIN_ASYNC_SUCCEED':
      return Immutable.fromJS(action.payload.userData).set('loadFlag', 1);
    case 'LOGOUT_ASYNC_SUCCEED':
      return InitialState.get('userData').set('loadFlag', 1);
    case 'LOGIN_ASYNC_ERROR':
    case 'FETCH_USER_ASYNC_ERROR':
    case 'LOGOUT_ASYNC_ERROR':
      return state.set('loadFlag', -1);
    default:
      return state;
  }
};
