/**
 * Created by ray.xie on 9/20/2016.
 */
import Immutable from 'immutable';

export const setState = (state, newState) => state.merge(Immutable.fromJS(newState));

export const succeedLogin = (state, userData) => state.set('userData', Immutable.fromJS(userData));

