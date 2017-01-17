import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoadingModalContainer from '../components/loading/element.jsx';
import NavigationContainer from '../components/navigation/element.jsx';
import config from '../config';

const Main = props => (
    <MuiThemeProvider>
        <div className="main-wrapper">
            <LoadingModalContainer />
            <NavigationContainer navigationItems={Immutable.fromJS(config.navigationItems)} />
            <div className="content" style={{ marginRight: '256px' }}>
                {props.children}
            </div>
        </div>
    </MuiThemeProvider>
    );

Main.propTypes = {
    // eslint-disable-next-line
    children: React.PropTypes.object,
};


const MainContainer = connect()(Main);

export default MainContainer;
