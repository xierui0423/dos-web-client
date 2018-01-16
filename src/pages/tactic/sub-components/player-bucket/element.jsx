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
  minHeight: 60,
  boxSizing: 'content-box',
  overflowX: 'scroll',
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
              <div style={{ whiteSpace: 'nowrap' }}>
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
