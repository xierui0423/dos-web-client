import React from 'react';
import Dialog from 'material-ui/Dialog';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

export const LoadingModal = ({ loadingMessages }) => (loadingMessages.size ?
    <Dialog open title="Loading..." >
        {loadingMessages.map(x => <div key={x.get('timestamp')} >{x.get('message')}</div>)}
    </Dialog> : null);

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
