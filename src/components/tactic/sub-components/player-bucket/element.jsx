import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Droppable } from 'react-beautiful-dnd';
import Paper from 'material-ui/Paper';
import PlayerCard from '../player-card/element';


// using some little inline style helpers to make the app look okay
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  minHeight: 40,
  boxSizing: 'content-box',
});

class PlayerBucket extends React.Component {
  render() {
    const { players, droppableId, droppableName } = this.props;

    return (
      <div><Paper>{droppableName}</Paper>
        <Droppable
          droppableId={droppableId}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <div>
                {players.map(player => (
                  <PlayerCard player={player} key={player.get('id')} />
                ))}
              </div>
            </div>
          )}
        </Droppable>
      </div>

    );
  }
}

PlayerBucket.propTypes = {
  players: ImmutablePropTypes.list.isRequired,
  droppableId: PropTypes.string.isRequired,
  droppableName: PropTypes.string.isRequired,
};

export default PlayerBucket;
