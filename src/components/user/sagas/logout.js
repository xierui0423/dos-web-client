import sagaFactory from '../../../sagas/saga-factory';
import dataServices from '../../../data-services';

const apiInvoker = dataServices.apiInvoker(
    'private/account/user/logout/',
    'POST');

export default sagaFactory('LOGOUT', apiInvoker, '/login');

