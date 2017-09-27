import Immutable from 'immutable';
import { ajax } from 'rxjs/observable/dom/ajax';

import InitialState from '../../../initial-state';
import config from '../../../config';


export const fetchUserEpic = action$ =>
  action$.ofType('FETCH_USER_ASYNC').mergeMap(
    action => ajax({ url: `${config.webServer.apiRoot}private/account/user/retrieve/`, method: 'GET', responseType: 'json' }).map(data => ({
      type: 'FETCH_USER_ASYNC_SUCCEED',
      payload: data.response.payload,
      message: data.response.message,
      resolveTimestamp: action.meta.timestamp,
      duration: 1000,
    })),
  );


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

