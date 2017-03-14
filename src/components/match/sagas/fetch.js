import sagaFactory from '../../../sagas/sagaFactory';
import dataServices from '../../../data-services';
import sockets from '../../../sockets';

const socketListener = dataServices.socketListener(sockets.gameSocket, 'fetch:match');

export default sagaFactory('FETCH_MATCH', socketListener);

