import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import reduceReducers from 'reduce-reducers';

import loadingMessages from '../components/loading/reducers/loading-messages';
import navigation from '../components/navigation/reducers/navigation';
import userData from '../components/user/reducers/user-data';

import initialLoaded from './initial';
import globalReducer from './global';

const reducers = {
  loadingMessages,
  navigation,
  userData,
  initialLoaded,
  form,
};

export default reduceReducers(globalReducer, combineReducers(Object.assign({}, reducers)));
