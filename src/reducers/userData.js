/**
 * Created by ray.xie on 1/5/2017.
 */

import Immutable from 'immutable';
import InitialState from '../initial-state';

export default (state = InitialState.get('userData'), action) => {
    switch (action.type) {
        case 'LOGIN_ASYNC_SUCCEED':
            return Immutable.fromJS(action.userData);
        default:
            return state;
    }
};

