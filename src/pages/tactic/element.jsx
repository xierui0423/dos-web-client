import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { updateTactic } from '../club/action-creators/club';
import PlayerBucket from './sub-components/player-bucket/element';

import confirmation from '../../components/confirmation/element';

const formations = [{
  name: '5-4-1',
  defenders: 5,
  midfielders: 4,
  attackers: 1,
}, {
  name: '5-3-2',
  defenders: 5,
  midfielders: 3,
  attackers: 2,
}, {
  name: '4-5-1',
  defenders: 4,
  midfielders: 5,
  attackers: 1,
}, {
  name: '4-4-2',
  defenders: 4,
  midfielders: 4,
  attackers: 2,
}, {
  name: '4-3-3',
  defenders: 4,
  midfielders: 3,
  attackers: 3,
}, {
  name: '3-6-1',
  defenders: 3,
  midfielders: 6,
  attackers: 1,
}, {
  name: '3-5-2',
  defenders: 3,
  midfielders: 5,
  attackers: 2,
}, {
  name: '3-4-3',
  defenders: 3,
  midfielders: 4,
  attackers: 3,
}];

class TacticPage extends React.Component {
  constructor(props) {
    super(props);

    const { clubData, playerData } = props;

    const tactic = clubData.get('tactic');
    const players = clubData.get('players').map(id => playerData.find(player => player.get('id') === id));

    const goalKeepers = tactic.get('goalKeepers').map(id => players.find(player => player.get('id') === id));
    const defenders = tactic.get('defenders').map(id => players.find(player => player.get('id') === id));
    const midfielders = tactic.get('midfielders').map(id => players.find(player => player.get('id') === id));
    const attackers = tactic.get('attackers').map(id => players.find(player => player.get('id') === id));


    this.state = {
      players: players.filter(player =>
        !tactic.get('goalKeepers').includes(player.get('id'))
        && !tactic.get('defenders').includes(player.get('id'))
        && !tactic.get('midfielders').includes(player.get('id'))
        && !tactic.get('attackers').includes(player.get('id'))),
      goalKeepers,
      defenders,
      midfielders,
      attackers,
      formation: tactic.get('formation'),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleChangeFormation = this.handleChangeFormation.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newState = {};

    ['players', 'goalKeepers', 'defenders', 'midfielders', 'attackers'].forEach((bucketName) => {
      const currentBucket = this.state[bucketName];

      newState[bucketName] = currentBucket;

      // Remove from the source bucket
      if (result.source.droppableId === bucketName) {
        newState[bucketName] = currentBucket.remove(result.source.index);
      }

      if (result.destination.droppableId === bucketName) {
        newState[bucketName] =
          (result.source.droppableId === bucketName ? newState[bucketName] : currentBucket)
            .insert(result.destination.index,
              this.state[result.source.droppableId].get(result.source.index));
      }
    });

    this.setState(newState);
  }

  handleChangeFormation(event) {
    this.setState({ formation: event.target.value });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <PlayerBucket
              players={this.state.players}
              droppableId="players"
              droppableName="Bench"
            />
            <PlayerBucket
              players={this.state.goalKeepers}
              droppableId="goalKeepers"
              droppableName="Goal Keeper"
            />
            <PlayerBucket
              players={this.state.defenders}
              droppableId="defenders"
              droppableName="Defenders"
            />
            <PlayerBucket
              players={this.state.midfielders}
              droppableId="midfielders"
              droppableName="Mid Fielders"
            />
            <PlayerBucket
              players={this.state.attackers}
              droppableId="attackers"
              droppableName="Attackers"
            />
          </div>
        </DragDropContext>

        <Select
          value={this.state.formation}
          onChange={this.handleChangeFormation}
        >
          {formations.map(f => <MenuItem value={f.name}>{f.name}</MenuItem>)}
        </Select>

        <Button
          raised
          color="primary"
          onClick={() => {
            const formation = formations.find(f => f.name === this.state.formation);

            if (this.state.goalKeepers.size === 1
              && this.state.defenders.size === formation.defenders
              && this.state.midfielders.size === formation.midfielders
              && this.state.attackers.size === formation.attackers) {
              confirmation({
                title: 'Save',
                text: 'Are you sure to save the tactic?',
                handleOk: () => {
                  this.props.handleUpdateTactic({
                    goalKeepers: this.state.goalKeepers.map(p => p.get('id')),
                    defenders: this.state.defenders.map(p => p.get('id')),
                    midfielders: this.state.midfielders.map(p => p.get('id')),
                    attackers: this.state.attackers.map(p => p.get('id')),
                    formation: this.state.formation,
                  });
                },
              });
            } else {
              confirmation({ alert: 'Invalid tactic!!!' });
            }
          }}
        >Save</Button>
      </div>
    );
  }
}

TacticPage.propTypes = {
  clubData: ImmutablePropTypes.map.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
  handleUpdateTactic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clubData: state.get('clubData'),
  playerData: state.get('marketData').get('playerData'),
});

const TacticPageContainer = connect(
  mapStateToProps,
  {
    handleUpdateTactic: updateTactic,
  },
)(withRouter(TacticPage));

export default TacticPageContainer;
