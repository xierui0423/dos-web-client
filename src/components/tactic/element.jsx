import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { updateTactic } from '../club/action-creators/club';


// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class TacticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map(item => (
                <Draggable key={item.id} draggableId={item.id}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        style={getItemStyle(
                          provided.draggableStyle,
                          snapshot.isDragging
                        )}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

TacticPage.propTypes = {
  clubData: ImmutablePropTypes.map.isRequired,
  playerData: ImmutablePropTypes.list.isRequired,
  teamData: ImmutablePropTypes.list.isRequired,
  leagueData: ImmutablePropTypes.list.isRequired,
  handleUpdateTactic: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  playerData: state.get('marketData').get('playerData'),
  teamData: state.get('marketData').get('teamData'),
  leagueData: state.get('marketData').get('leagueData'),
  clubData: state.get('clubData'),
});

const TacticPageContainer = connect(
  mapStateToProps,
  {
    navigate: push,
    handleUpdateTactic: updateTactic,
  },
)(withRouter(TacticPage));

export default TacticPageContainer;


// import React from 'react';
// import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
// import { withRouter } from 'react-router-dom';
// import { push } from 'react-router-redux';
// import { connect } from 'react-redux';
// import Paper from 'material-ui/Paper';
// import Avatar from 'material-ui/Avatar';
// import { updateTactic } from '../club/action-creators/club';
//
// class TacticPage extends React.Component {
//
//   render() {
//     const { clubData, playerData, teamData, leagueData, navigate } = this.props;
//
//     return (<div>
//       <Paper>Tactic</Paper>
//     </div>);
//   }
// }
//

