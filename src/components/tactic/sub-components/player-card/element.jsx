import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Draggable } from 'react-beautiful-dnd';

import Avatar from 'material-ui/Avatar';


// using some little inline style helpers to make the app look okay
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 16,
  margin: '0 8px 0 0',
  flex: 1,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class PlayerCard extends React.Component {
  render() {
    const player = this.props.player;

    return (
      <Draggable draggableId={player.get('id')} >
        {(provided, snapshot) => (
          <div style={{ flex: 1 }}>
            <div
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging,
              )}
              {...provided.dragHandleProps}
            >
              <Avatar>
                {player.get('name')}
              </Avatar>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

PlayerCard.propTypes = {
  player: ImmutablePropTypes.map.isRequired,
};

export default PlayerCard;
