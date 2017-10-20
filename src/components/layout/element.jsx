import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
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

const NAVBAR_WIDTH = '100px';
const CONTENT_PADDING = '10px';

const style = {
  '@global': {
    'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
      margin: '0',
      padding: '0',
      border: '0',
      fontSize: '100%',
      font: 'inherit',
      verticalAlign: 'baseline',
    },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
      display: 'block',
    },
    'html, body': {
      height: '100%',
    },
    body: {
      lineHeight: 1,
    },
    'ol, ul': {
      listStyle: 'none',
    },
    'blockquote, q': {
      quotes: 'none',
    },
    'blockquote:before, blockquote:after, q:before, q:after': {
      content: 'none',
    },
    table: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  mainWrapper: {
    height: '100vh',
  },
  content: {
    marginLeft: NAVBAR_WIDTH,
    padding: CONTENT_PADDING,
    height: '100%',
  },
  navbar: {
    width: NAVBAR_WIDTH,
    height: '100%',
    float: 'left',
  },
};

class Main extends React.Component {

  componentWillMount() {
    // Retrieve the user data if it doesn't exist
    if (!this.props.initialLoaded) {
      this.props.handleFetchUser();
    }
  }

  render() {
    const { classes, children, initialLoaded } = this.props;

    return initialLoaded ? (
      <MuiThemeProvider theme={theme}>
        <div className={classes.mainWrapper}>
          <LoadingModalContainer />
          <nav className={classes.navbar}>
            <NavigationContainer
              navbarWidth={NAVBAR_WIDTH}
              navigationItems={Immutable.fromJS(config.navigationItems)}
            />
          </nav>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </MuiThemeProvider>) : null;
  }
}


Main.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  initialLoaded: PropTypes.bool.isRequired,
  handleFetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    initialLoaded: state.get('initialLoaded'),
  }
);

const MainContainer = connect(mapStateToProps, {
  handleFetchUser: fetchUser,
})(injectSheet(style)(Main));

export default MainContainer;
