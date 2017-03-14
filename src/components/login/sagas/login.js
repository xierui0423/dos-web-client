import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker('http://localhost:3000/api/public/account/user/login/',
    'POST', action => (JSON.stringify({
        username: action.loginData.get('username'),
        password: action.loginData.get('password'),
    })));

export default sagaFactory('LOGIN', apiInvoker, '/user');
