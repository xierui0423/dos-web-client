import React from 'react';
import { withRouter } from 'react-router-dom';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

export const Navigation = ({ navigate, navigationItems, location }) =>
    (<List>
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
    </List>);

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  navigationItems: ImmutablePropTypes.list.isRequired,
};

const mapStateToProps = () => ({});

const NavigationContainer = connect(
    mapStateToProps,
  {
    navigate: push,
  },
)(withRouter(Navigation));

export default NavigationContainer;
