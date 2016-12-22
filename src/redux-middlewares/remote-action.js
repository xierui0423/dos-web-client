/**
 * Created by ray.xie on 9/26/2016.
 */

export default socket => store => next => (action) => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
};
