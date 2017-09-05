import { reducer as form } from 'redux-form/immutable';
import loadingMessages from '../components/loading/reducers/loading-messages';
import navigation from '../components/navigation/reducers/navigation';
import userData from '../components/user/reducers/user-data';
import initialLoaded from './initial';

export default {
  loadingMessages,
  navigation,
  userData,
  initialLoaded,
  form,
};
