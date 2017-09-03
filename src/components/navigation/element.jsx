import React from 'react';
import { withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

export const Navigation = ({ navigate, navigation, navigationItems, location }) =>
    (<Drawer open={navigation.get('open')} anchor="right" type="permanent" >
      {
            navigationItems.map(
                (item) => {
                  const url = item.get('urls').get(0);
                  const selected = item.get('urls').contains(location.pathname);

                  return (<MenuItem
                    key={url}
                    selected={selected}
                    onClick={() => {
                      navigate(url);
                    }}
                  >
                    {item.get('name')}
                  </MenuItem>);
                },
            )
        }
    </Drawer>);

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  navigationItems: ImmutablePropTypes.list.isRequired,
  navigation: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.get('navigation'),
});

const NavigationContainer = connect(
    mapStateToProps,
  {
    navigate: push,
  },
)(withRouter(Navigation));

export default NavigationContainer;
