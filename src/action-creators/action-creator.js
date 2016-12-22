/**
 * Created by ray.xie on 9/26/2016.
 */

export const setState = state => ({
  type: 'SET_STATE',
  state,
});

export const vote = entry => ({
  type: 'VOTE',
  meta: { remote: true },
  entry,
});

export const next = () => ({
  meta: { remote: true },
  type: 'NEXT',
});
