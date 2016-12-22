/**
 * Created by ray.xie on 9/20/2016.
 */
import { resetState, setState, vote, INITIAL_STATE } from '../core';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return resetState(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
};
