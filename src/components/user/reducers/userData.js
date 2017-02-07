import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('userData'), action) => {
    switch (action.type) {
        case 'FETCH_USER_ASYNC_SUCCEED':
        case 'LOGIN_ASYNC_SUCCEED':
            return Immutable.fromJS(action.userData);
        default:
            return state;
    }
};

