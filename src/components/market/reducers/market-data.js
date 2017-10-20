import Immutable from 'immutable';
import InitialState from '../../../initial-state';
import epicFactory from '../../../modules/helper-modules/epic-factory';

export const fetchMarketEpic = epicFactory('FETCH_MARKET', {
  url: 'private/market/retrieve/',
  method: 'GET',
});


export default (state = InitialState.get('marketData'), action) => {
  switch (action.type) {
    case 'FETCH_MARKET_ASYNC_SUCCEED':
      return Immutable.fromJS(action.payload.marketData);
    default:
      return state;
  }
};
