import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoadingModalContainer from '../components/loading/element.jsx';
import NavigationContainer from '../components/navigation/element.jsx';
import { fetchUser } from './user/action-creators/user';
import config from '../config';

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
      <MuiThemeProvider>
        <div className="main-wrapper">
          <LoadingModalContainer />
          <NavigationContainer
              navigationItems={Immutable.fromJS(config.navigationItems)}
          />
          <div className="content" style={{ marginRight: '256px' }}>
            {children}
          </div>
        </div>
      </MuiThemeProvider>) : null;
  }
}


Main.propTypes = {
    // eslint-disable-next-line
    children: React.PropTypes.object,
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
