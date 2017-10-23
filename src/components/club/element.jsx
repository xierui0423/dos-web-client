import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { fetchClub } from './action-creators/club';

class ClubPage extends React.Component {

  render() {
    const { clubData, playerData, teamData, leagueData, navigate } = this.props;

    return (<div>
      <Paper>MARKET
        {clubData.get('ownedPlayers').map(pid => playerData.find(player => player.get('id') === pid)).map((player) => {
          const team = teamData.find(t => t.get('id') === player.get('teamId'));
          const league = leagueData.find(l => l.get('id') === team.get('leagueId'));

          return (<Avatar
            key={player.get('id')}
            onClick={() => {
              navigate(`/market/${league.get('id')}/${team.get('id')}/${player.get('id')}`);
            }}
          >{player.get('name')}</Avatar>);
        })}
      </Paper>
    </div>);
  }
}

ClubPage.propTypes = {
  clubData: ImmutablePropTypes.map.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  playerData: state.get('marketData').get('playerData'),
  teamData: state.get('marketData').get('teamData'),
  leagueData: state.get('marketData').get('leagueData'),
  clubData: state.get('clubData'),
});

const ClubPageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
    handleFetchClub: fetchClub,
  },
)(withRouter(ClubPage));

export default ClubPageContainer;
