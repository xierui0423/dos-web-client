import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
            <div>
                <div>Signed in as: {this.props.userData.get('username')}</div>
                <RaisedButton
                    primary type="button"
                    onClick={() => this.props.handleLogout()}
                >
                            Logout
                        </RaisedButton>
            </div>
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
