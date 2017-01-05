/**
 * Created by ray.xie on 1/4/2017.
 */

export default () => next => action =>
    // Timestamp the action
    next(
        Object.assign(action,
            {
                meta: Object.assign({}, action.meta, { timestamp: new Date().getTime() }),
            }
        )
    );
