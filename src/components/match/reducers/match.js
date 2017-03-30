import Immutable from 'immutable';
import InitialState from '../../../initialState';

export default (state = InitialState.get('match'), action) => {
  switch (action.type) {
        // case 'CREATE_MATCH':
        //     return state.merge(Immutable.fromJS(action.payload.match));
    case 'FETCH_MATCH_SOCKET':
      return state.merge(Immutable.fromJS(action.payload.match));
    case 'LOGOUT_ASYNC_SUCCEED':
      return InitialState.get('match');
        // case 'BEGIN_MATCH':
        //     return state.set('isMatchGoing', true);
    case 'FETCH_RECORD_SOCKET':
      return state.updateIn(['live'], live => live.push(
                Immutable.fromJS(action.payload.record)));
    default:
      return state;
  }
};

