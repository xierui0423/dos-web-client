import React from 'react';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
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
    <Dialog open title={title}>
      <List>
        {loadingMessages.valueSeq().map(message => (<ListItem
          key={message.get('timestamp')}
        > <ListItemText primary={message.get('message')} /></ListItem >))}
      </List>
    </Dialog> : null);
};

LoadingModal.propTypes = {
  loadingMessages: ImmutablePropTypes.list.isRequired,
};

const mapStateToProps = state => (
  {
    loadingMessages: state.get('loadingMessages'),
  }
);

const LoadingModalContainer = connect(
  mapStateToProps,
)(LoadingModal);

export default LoadingModalContainer;
