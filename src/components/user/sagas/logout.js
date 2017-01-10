import sagaFactory from '../../../sagas/sagaFactory';

export default sagaFactory('LOGOUT', 'http://localhost:3000/api/private/account/user/logout/', 'POST', 'userData', undefined, '/login');

