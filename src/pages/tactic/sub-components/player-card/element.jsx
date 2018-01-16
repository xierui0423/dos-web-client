import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from 'material-ui/Avatar';

// using some little inline style helpers to make the app look okay
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: '0 8px 0 0',
  boxSizing: 'boarder-box',
  width: 40,
  height: 40,
  display: 'inline-block',
  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getAvatarStyle = isDragging => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  cursor: 'pointer',
});

class PlayerCard extends React.Component {
  render() {
    const player = this.props.player;

    return (
      <Draggable draggableId={player.get('id')}>
        {(provided, snapshot) => (
          <div style={{ display: 'inline-block', verticalAlign: 'top', fontSize: 0 }}>
            <div
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging,
              )}
              {...provided.dragHandleProps}
            >
              <Avatar style={getAvatarStyle(
                snapshot.isDragging,
              )}
              >
                {player.get('name')}
              </Avatar>
            </div>
            {snapshot.isDragging ? <div style={{ width: 40,
              height: 40,
              margin: '0 8px 0 0',
              display: 'inline-block' }}
            /> : null}
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
