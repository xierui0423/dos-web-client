import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('FETCH_USER', 'http://localhost:3000/api/private/account/user/retrieve/',
    'GET', 'userData');

