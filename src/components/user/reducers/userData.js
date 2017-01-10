import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('userData'), action) => {
    switch (action.type) {
        case 'FETCH_USER_ASYNC_SUCCEED':
            return Immutable.fromJS(action.userData);
        case 'LOGOUT_ASYNC_SUCCEED':
            return Immutable.fromJS(InitialState.get('userData'));
        default:
            return state;
    }
};

