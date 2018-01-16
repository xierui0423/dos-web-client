import React from 'react';
import { withRouter } from 'react-router-dom';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

export const Navigation = ({ navigate, navigationItems, location, loggedIn }) =>
    (<List>
      {
            navigationItems.map(
                (item) => {
                  const url = item.get('url');
                  const selected = url === location.pathname;
                  const isPublicNav = item.get('isPublic');

                  return ((loggedIn && !isPublicNav) || (!loggedIn && isPublicNav)) ? (<MenuItem
                    key={url}
                    selected={selected}
                    onClick={() => {
                      navigate(url);
                    }}
                  >
                    {item.get('name')}
                  </MenuItem>) : null;
                },
            )
        }
    </List>);

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  navigationItems: ImmutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({ loggedIn: state.get('userData').get('id') >= 0 });

const NavigationContainer = connect(
    mapStateToProps,
  {
    navigate: push,
  },
)(withRouter(Navigation));

export default NavigationContainer;
