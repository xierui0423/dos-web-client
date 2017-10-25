import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import { updatePlayer } from '../../club/action-creators/club';

class MarketPage extends React.Component {

  render() {
    const {
      leagueData, teamData, playerData, clubData, handleUpdatePlayer, navigate, match,
    } = this.props;

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
        clubData.get('players').includes(currentPlayer.get('id')) ?
          <Button onClick={() => {
            handleUpdatePlayer(clubData.set('players', clubData.get('players').filter(pid => pid !== currentPlayer.get('id'))).toJSON());
          }}
          >Sell</Button> : <Button onClick={() => {
            handleUpdatePlayer(clubData.set('players', clubData.get('players').push(currentPlayer.get('id'))).toJSON());
          }}
          >Sign</Button>
      }

    </div>);
  }
}

MarketPage.propTypes = {
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
  handleUpdatePlayer: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
  clubData: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = (state) => {
  const marketData = state.get('marketData');
  return {
    leagueData: marketData.get('leagueData'),
    teamData: marketData.get('teamData'),
    playerData: marketData.get('playerData'),
    clubData: state.get('clubData'),
  };
};

const MarketPageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
    handleUpdatePlayer: updatePlayer,
  },
)(withRouter(MarketPage));

export default MarketPageContainer;
