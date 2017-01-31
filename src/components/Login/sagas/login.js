import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('LOGIN', 'http://localhost:3000/api/public/account/user/login/',
    'POST', 'userData', action => (JSON.stringify({
        username: action.loginData.get('username'),
        password: action.loginData.get('password'),
    })), '/user');
