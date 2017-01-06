/**
 * Created by ray.xie on 1/5/2017.
 */

import handleLoginSaga from '../components/login/sagas/handleLogin';
import clearLoadingMessageSaga from '../components/loading/sagas/clearLoadingMessage';


export default [
    handleLoginSaga,
    clearLoadingMessageSaga,
];
