/**
 * Created by ray.xie on 1/4/2017.
 */
import Immutable from 'immutable';

export const INITIAL_STATE = Immutable.fromJS(
    {
        loginData: { username: '', password: '' },
        userData: { id: '' },
        loadingMessages: [],
    }
);
