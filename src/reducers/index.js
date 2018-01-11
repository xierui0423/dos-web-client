import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import reduceReducers from 'reduce-reducers';

import loadingMessages from '../components/loading/reducers/loading-messages';

import userData from '../pages/user/reducers/user-data';
import marketData from '../pages/market/reducers/market-data';
import clubData from '../pages/club/reducers/club-data';

import globalReducer from './global';

const reducers = {
  loadingMessages,
  userData,
  marketData,
  clubData,
  form,
};

export default reduceReducers(globalReducer, combineReducers(Object.assign({}, reducers)));
