import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

export const Navigation = ({ navigate, navigation, navigationItems, routing }) =>
    (<Drawer open={navigation.get('open')} openSecondary >
      {
            navigationItems.map(
                (item, index) => {
                  const url = item.get('urls').get(0);
                  const checked = item.get('urls').contains(routing.get('locationBeforeTransitions').pathname);

                  return (<MenuItem
                      key={index}
                      checked={checked}
                      onClick={() => {
                        navigate(url);
                      }}
                  >
                    {item.get('name')}
                  </MenuItem>);
                }
            )
        }
    </Drawer>);

Navigation.propTypes = {
  navigate: React.PropTypes.func,
  navigationItems: ImmutablePropTypes.list,
  navigation: ImmutablePropTypes.map,
  routing: ImmutablePropTypes.map,
};

const mapStateToProps = state => ({
  navigation: state.get('navigation'),
  routing: state.get('routing'),
});

const NavigationContainer = connect(
    mapStateToProps,
  {
    navigate: push,
  }
)(Navigation);

export default NavigationContainer;
