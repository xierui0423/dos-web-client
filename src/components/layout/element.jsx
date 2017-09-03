import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LoadingModalContainer from '../loading/element';
import NavigationContainer from '../navigation/element';
import { fetchUser } from '../user/action-creators/user';
import config from '../../config/index';

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});

class Main extends React.Component {

  componentWillMount() {
    // Retrieve the user data if it doesn't exist
    if (!this.props.initialLoaded) {
      this.props.handleFetchUser();
    }
  }

  render() {
    const { children, initialLoaded } = this.props;

    return initialLoaded ? (
      <MuiThemeProvider theme={theme}>
        <div className="main-wrapper">
          <LoadingModalContainer />
          <NavigationContainer
            navigationItems={Immutable.fromJS(config.navigationItems)}
          />
          <div className="content">
            {children}
          </div>
        </div>
      </MuiThemeProvider>) : null;
  }
}


Main.propTypes = {
  children: PropTypes.array.isRequired,
  initialLoaded: PropTypes.bool.isRequired,
  handleFetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    // initialValues: state.get('playerData'),
    initialLoaded: state.get('initialLoaded'),
  }
);

const MainContainer = connect(mapStateToProps, {
  handleFetchUser: fetchUser,
})(Main);

export default MainContainer;
