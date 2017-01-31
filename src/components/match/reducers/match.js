import Immutable from 'immutable';
import InitialState from '../../../initial-state';

export default (state = InitialState.get('match'), action) => {
    switch (action.type) {
        case 'FETCH_MATCH_ASYNC_SUCCEED':
            return Immutable.fromJS(action.match);
        case 'LOGOUT_ASYNC_SUCCEED':
            return Immutable.fromJS(InitialState.get('match'));
        default:
            return state;
    }
};

