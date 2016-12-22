/**
 * Created by ray.xie on 9/20/2016.
 */
import { change, INITIAL_STATE } from '../core';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE':
            return change(state, action.value);
        default:
            return state;
    }
};

