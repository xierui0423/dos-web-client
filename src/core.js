/**
 * Created by ray.xie on 9/20/2016.
 */
import Immutable from 'immutable';

export const INITIAL_STATE = Immutable.Map();

export const setState = (state, newState) => state.merge(newState);

export const vote = (state, entry) => {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  }
  return state;
};

export const resetState = (state) => {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], Immutable.List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  }
  return state;
};
