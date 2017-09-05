import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('userData'), action) => {
  switch (action.type) {
    case 'FETCH_USER_ASYNC_SUCCEED':
      return Immutable.fromJS(action.payload.userData);
    case 'LOGIN_ASYNC_SUCCEED':
            // Save the token to localStorage for socket.io authentication
      return Immutable.fromJS(action.payload.userData);
    default:
      return state;
  }
};

