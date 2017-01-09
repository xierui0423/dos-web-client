import React from 'react';
import {
    Col,
    Form,
    FormGroup,
    Button,
    HelpBlock,
} from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchUser, logout } from './action-creators/user';

class UserPanel extends React.Component {

    componentWillMount() {
        // Retrieve the user data if it doesn't exist
        if (!this.props.userData.get('id')) {
            this.props.handleFetchUser();
        }
    }

    render() {
        return (this.props.userData.get('id') ?
            <Form horizontal >
                <HelpBlock>Signed in as: {this.props.userData.get('username')}</HelpBlock>
                <FormGroup>
                    <Col smOffset={2} sm={10} >
                        <Button
                            bsStyle="primary" type="button"
                            onClick={() => this.props.handleLogout()}
                        >
                            Logout
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            : null);
    }
}


UserPanel.propTypes = {
    userData: ImmutablePropTypes.map,
    handleFetchUser: React.PropTypes.func,
    handleLogout: React.PropTypes.func,
};

const mapStateToProps = state => (
    {
        userData: state.get('userData'),
    }
);

const UserPanelContainer = connect(
    mapStateToProps,
    {
        handleFetchUser: fetchUser,
        handleLogout: logout,
    }
)(UserPanel);

export default UserPanelContainer;
