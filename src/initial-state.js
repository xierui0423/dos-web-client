import Immutable from 'immutable';

export default Immutable.fromJS(
    {
        loginData: { username: '', password: '' },
        userData: { id: '' },
        loadingMessages: [],
        navigation: { open: true, disabledUrls: [] },
        playerData: { createStep: 1 },
    }
);
