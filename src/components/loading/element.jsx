import React from 'react';
import Dialog from 'material-ui/Dialog';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

export const LoadingModal = ({ loadingMessages }) => {
  let title = '';

  const overallStatus = loadingMessages.map(message => message.get('status'))
        .reduce((pre, next) => {
          if (pre === -1 || next === -1) {
            return -1;
          } else if (pre === 0 || next === 0) {
            return 0;
          }
          return 1;
        }, 1);

  switch (overallStatus) {
    case -1:
      title = 'Error';
      break;
    case 0:
      title = 'Loading...';
      break;
    default :
      title = 'Loaded';
  }

  return (loadingMessages.size ?
    <Dialog open title={title} >
      {loadingMessages.map((message, index) => <div
          key={index}
      >{message.get('message')}</div>)}
    </Dialog> : null);
};

LoadingModal.propTypes = {
  loadingMessages: ImmutablePropTypes.list,
};

const mapStateToProps = state => (
  {
    loadingMessages: state.get('loadingMessages'),
  }
);

const LoadingModalContainer = connect(
    mapStateToProps
)(LoadingModal);

export default LoadingModalContainer;
