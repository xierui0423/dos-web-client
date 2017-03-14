import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'http://localhost:3000/api/private/account/user/logout/',
    'POST');

export default sagaFactory('LOGOUT', apiInvoker, '/login');

