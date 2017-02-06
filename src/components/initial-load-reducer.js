// import Immutable from 'immutable';
import InitialState from '../initial-state';

export default (state = InitialState.get('initialLoaded'), action) => {
    switch (action.type) {
        case 'FETCH_USER_ASYNC_SUCCEED':
        case 'FETCH_USER_ASYNC_ERROR':
            return true;
        default:
            return state;
    }
};

