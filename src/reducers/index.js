import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import reduceReducers from 'reduce-reducers';

import loadingMessages from '../components/loading/reducers/loading-messages';
import userData from '../components/user/reducers/user-data';
import marketData from '../components/market/reducers/market-data';
import clubData from '../components/club/reducers/club-data';

import globalReducer from './global';

const reducers = {
  loadingMessages,
  userData,
  marketData,
  clubData,
  form,
};

export default reduceReducers(globalReducer, combineReducers(Object.assign({}, reducers)));
