import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { fetchMarket } from '../action-creators/market';

class LeaguePage extends React.Component {

  componentWillMount() {
    if (!this.props.leagueData) {
      this.props.handleFetchMarket();
    }
  }

  render() {
    const { leagueData, teamData, navigate, match } = this.props;

    if (!leagueData) { return null; }

    const currentLeague = leagueData.find(l => l.get('id') === parseInt(match.params.league, 10));
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
      <Paper>
        {teams.map(team => (<Avatar
          key={team.get('id')}
          onClick={() => {
            navigate(`/market/${currentLeague.get('id')}/${team.get('id')}`);
          }}
        >{team.get('name')}</Avatar>))}
      </Paper>
    </div>);
  }
}

LeaguePage.propTypes = {
  leagueData: ImmutablePropTypes.list.isRequired,
  navigate: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
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

const LeaguePageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
    handleFetchMarket: fetchMarket,
  },
)(withRouter(LeaguePage));

export default LeaguePageContainer;
