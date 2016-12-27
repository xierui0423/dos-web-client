/**
 * Created by ray.xie on 9/20/2016.
 */
import Immutable from 'immutable';

export const INITIAL_STATE = Immutable.fromJS({
    loginData: { username: '', password: '' },
    userData: { id: '' },
});

export const setState = (state, newState) => state.merge(newState);

export const succeedLogin = (state, userData) => state.set('userData', userData);
