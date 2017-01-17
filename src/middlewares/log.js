export default store => next => (action) => {
    try {
        console.log(action.type);
        const result = next(action);
        console.log('next state', store.getState().toJSON());
        return result;
    } catch (err) {
        console.error('Caught an exception!', err);
        throw err;
    }
};
