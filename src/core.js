/**
 * Created by ray.xie on 9/20/2016.
 */
import Immutable from 'immutable';

export const INITIAL_STATE = Immutable.Map();

export const setState = (state, newState) => state.merge(newState);

export const change = (state, value) => state.set('value', value);
