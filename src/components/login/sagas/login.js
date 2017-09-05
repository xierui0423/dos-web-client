import sagaFactory from '../../../sagas/saga-factory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker('public/account/user/login/',
    'POST', action => (JSON.stringify({
      username: action.loginData.get('username'),
      password: action.loginData.get('password'),
    })));

export default sagaFactory('LOGIN', apiInvoker, '/user');
