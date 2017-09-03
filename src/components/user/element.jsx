import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { logout } from './action-creators/user';

class UserPanel extends React.Component {

  componentWillMount() {
  }

  render() {
    const { userData, handleLogout } = this.props;
    return (
      <div>
        <div>Signed in as: {userData.get('username')}</div>
        <Button
          raised
          color="primary"
          type="button"
          onClick={() => handleLogout()}
        >
                    Logout
                </Button>
      </div>);
  }
}

UserPanel.propTypes = {
  userData: ImmutablePropTypes.map.isRequired,
    // handleFetchUser: React.PropTypes.func,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    userData: state.get('userData'),
  }
);

const UserPanelContainer = connect(
    mapStateToProps,
  {
        // handleFetchUser: fetchUser,
    handleLogout: logout,
  },
)(UserPanel);

export default UserPanelContainer;
