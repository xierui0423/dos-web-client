import Immutable from 'immutable';

export default Immutable.fromJS(
    {
        initialLoaded: false,
        match: {
            live: []
        },
        userData: {},
        loadingMessages: [],
        navigation: { open: true, disabledUrls: [] },
        playerData: {
            retrieved: false,
            createStep: 1,
            height: 170,
            weight: 70,
            speed: 5,
            agility: 5,
            strength: 5,
            pass: 5,
            control: 5,
            tackle: 5,
            head: 5,
            shoot: 5,
            flair: 5,
            experience: 0,
        },
    }
);
