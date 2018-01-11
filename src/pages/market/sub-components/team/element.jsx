import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

class TeamPage extends React.Component {

  render() {
    const { leagueData, teamData, playerData, navigate, match } = this.props;

    const currentLeague = leagueData.find(l => l.get('id') === parseInt(match.params.league, 10));
    const currentTeam = teamData.find(t => t.get('id') === parseInt(match.params.team, 10));
    const teams = teamData.filter(t => t.get('leagueId') === currentLeague.get('id'));
    const players = playerData.filter(p => p.get('teamId') === currentTeam.get('id'));

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
      <Paper>
        {players.map(player => (<Avatar
          key={player.get('id')}
          onClick={() => {
            navigate(`/market/${currentLeague.get('id')}/${currentTeam.get('id')}/${player.get('id')}`);
          }}
        >{player.get('name')}</Avatar>))}
      </Paper>
    </div>);
  }
}

TeamPage.propTypes = {
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
};

const mapStateToProps = (state) => {
  const marketData = state.get('marketData');
  return {
    leagueData: marketData.get('leagueData'),
    teamData: marketData.get('teamData'),
    playerData: marketData.get('playerData'),
  };
};

const TeamPageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
  },
)(withRouter(TeamPage));

export default TeamPageContainer;
