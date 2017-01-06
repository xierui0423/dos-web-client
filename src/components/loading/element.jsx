import React from 'react';
import {
    Modal,
    HelpBlock,
} from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

export const LoadingModal = ({ loadingMessages }) => {

    return (loadingMessages.size ? <Modal show>
        <Modal.Header>
            <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {loadingMessages.map(x => <HelpBlock key={x.get('timestamp')}>{x.get('message')}</HelpBlock>)}
        </Modal.Body>
        <Modal.Footer>
            Waiting while loading...
        </Modal.Footer>
    </Modal> : null);
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
