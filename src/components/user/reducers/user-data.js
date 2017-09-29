import Immutable from 'immutable';
import epicFactory from '../../../modules/helper-modules/epic-factory';
import InitialState from '../../../initial-state';

export const loginEpic = epicFactory('LOGIN', {
  url: 'public/account/user/login/',
  method: 'POST',
  inputHandler: action => (JSON.stringify({
    username: action.loginData.get('username'),
    password: action.loginData.get('password'),
  })),
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
    case 'FETCH_USER_ASYNC_SUCCEED':
      return Immutable.fromJS(action.payload.userData);
    case 'LOGIN_ASYNC_SUCCEED':
      return Immutable.fromJS(action.payload.userData);
    default:
      return state;
  }
};
