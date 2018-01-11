import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LoadingModalContainer from '../../components/loading/element';
import NavigationContainer from '../navigation/element';
import config from '../../config/index';
import { fetchUser } from '../user/action-creators/user';
import { fetchMarket } from '../market/action-creators/market';
import { fetchClub } from '../club/action-creators/club';

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

  componentDidMount() {
    // Retrieve the user data if it doesn't exist
    if (this.props.userLoadFlag === -2) {
      this.props.handleFetchUser();
    }

    if (this.props.marketLoadFlag === -2) {
      this.props.handleFetchMarket();
    }

    if (this.props.clubLoadFlag === -2) {
      this.props.handleFetchClub();
    }
  }

  componentDidUpdate() {
    // Retrieve the user data if it doesn't exist
    if (this.props.userLoadFlag === -2) {
      this.props.handleFetchUser();
    }

    if (this.props.marketLoadFlag === -2) {
      this.props.handleFetchMarket();
    }

    if (this.props.clubLoadFlag === -2) {
      this.props.handleFetchClub();
    }
  }

  render() {
    const { classes, children, userLoadFlag, marketLoadFlag, clubLoadFlag } = this.props;

    return (<MuiThemeProvider theme={theme}>
      <div className={classes.mainWrapper}>
        <LoadingModalContainer />
        <nav className={classes.navbar}>
          <NavigationContainer
            navbarWidth={NAVBAR_WIDTH}
            navigationItems={Immutable.fromJS(config.navigationItems)}
          />
        </nav>

        {
          (userLoadFlag === -1 || marketLoadFlag === -1 || clubLoadFlag === -1) ?
            (<div> Something went wrong, please refresh the page to reload... </div>) :
            (userLoadFlag === 1 && marketLoadFlag === 1 && clubLoadFlag === 1) ?
              (<div className={classes.content}>
                {children}
              </div>) : (<div>Loading...</div>)
        }
      </div>
    </MuiThemeProvider>);
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  userLoadFlag: PropTypes.number.isRequired,
  marketLoadFlag: PropTypes.number.isRequired,
  clubLoadFlag: PropTypes.number.isRequired,
  handleFetchUser: PropTypes.func.isRequired,
  handleFetchMarket: PropTypes.func.isRequired,
  handleFetchClub: PropTypes.func.isRequired,

};

const mapStateToProps = state => (
  {
    userLoadFlag: state.get('userData').get('loadFlag'),
    marketLoadFlag: state.get('marketData').get('loadFlag'),
    clubLoadFlag: state.get('clubData').get('loadFlag'),
  }
);

const MainContainer = connect(mapStateToProps, {
  handleFetchUser: fetchUser,
  handleFetchMarket: fetchMarket,
  handleFetchClub: fetchClub,
})(injectSheet(style)(Main));

export default MainContainer;
