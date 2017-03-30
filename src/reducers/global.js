// import Immutable from 'immutable';
import InitialState from '../initialState';

export default (state = InitialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_ASYNC_SUCCEED':
    case 'FETCH_USER_ASYNC_ERROR':
      return state.set('initialLoaded', true);
    case 'LOGOUT_ASYNC_SUCCEED':
    case 'LOGIN_ASYNC_SUCCEED':
      return state.merge(InitialState).set('initialLoaded', true);
    default:
      return state;
  }
};

