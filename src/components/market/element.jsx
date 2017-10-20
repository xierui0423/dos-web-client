import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { fetchMarket } from './action-creators/market';

class MarketPage extends React.Component {

  componentWillMount() {
    if (!this.props.leagueData) {
      this.props.handleFetchMarket();
    }
  }

  render() {
    const { leagueData, navigate } = this.props;

    return leagueData ? (<div>
      <Paper>MARKET
        {leagueData.map(league => (<Avatar
          key={league.get('id')}
          onClick={() => {
            navigate(`/market/${league.get('id')}`);
          }}
        >{league.get('name')}</Avatar>))}
      </Paper>
    </div>) : null;
  }
}

MarketPage.propTypes = {
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
  handleFetchMarket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const marketData = state.get('marketData');
  return {
    leagueData: marketData.get('leagueData'),
    teamData: marketData.get('teamData'),
    playerData: marketData.get('playerData'),
  };
};

const MarketPageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
    handleFetchMarket: fetchMarket,
  },
)(withRouter(MarketPage));

export default MarketPageContainer;
