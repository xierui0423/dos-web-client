import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { fetchMarket } from '../action-creators/market';

class MarketPage extends React.Component {

  componentWillMount() {
    if (!this.props.leagueData) {
      this.props.handleFetchMarket();
    }
  }

  render() {
    const {
      leagueData, teamData, playerData, ownedPlayers, navigate, match,
    } = this.props;

    if (!leagueData) { return null; }

    const currentLeague = leagueData.find(l => l.get('id') === parseInt(match.params.league, 10));
    const currentTeam = teamData.find(t => t.get('id') === parseInt(match.params.team, 10));
    const currentPlayer = playerData.find(p => p.get('id') === parseInt(match.params.player, 10));
    const teams = teamData.filter(t => t.get('leagueId') === currentLeague.get('id'));

    return (<div>
      <Paper>{currentLeague.get('name')}
        {leagueData.map(league => (<Avatar
          key={league.get('id')}
          onClick={() => {
            navigate(`/market/${league.get('id')}`);
          }}
        >{league.get('name')}</Avatar>))}
      </Paper>
      <Paper>{currentTeam.get('name')}
        {teams.map(team => (<Avatar
          key={team.get('id')}
          onClick={() => {
            navigate(`/market/${currentLeague.get('id')}/${team.get('id')}`);
          }}
        >{team.get('name')}</Avatar>))}
      </Paper>
      <Paper>{currentPlayer.get('name')}</Paper>
      {
        ownedPlayers.includes(currentPlayer.get('id')) ?
          <Button>Sell</Button> : <Button>Sign</Button>
      }

    </div>);
  }
}

MarketPage.propTypes = {
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
  ownedPlayers: ImmutablePropTypes.list.isRequired,
  handleFetchMarket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const marketData = state.get('marketData');
  return {
    leagueData: marketData.get('leagueData'),
    teamData: marketData.get('teamData'),
    playerData: marketData.get('playerData'),
    ownedPlayers: state.get('clubData').get('ownedPlayers'),
    userData: state.get('userData'),
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
