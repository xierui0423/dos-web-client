import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {
    fetchMatchOnSocket,
    fetchRecordOnSocket,
} from './action-creators/match';

import sockets from '../../sockets';

class UserPanel extends React.Component {

  componentWillMount() {
        // // Retrieve the user data if it doesn't exist
        // if (!this.props.match.id) {
        //     this.props.handleFetchMatch();
        //
        //     // setInterval(()=>{ this.props.handleFetchMatch();}, 3000);
        // }
  }

  componentDidMount() {
    this.__createSocket();
  }

    // componentDidUpdate() {
    //     this.__createSocket();
    // }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  __createSocket() {
    const { handleFetchMatch, handleFetchRecord } = this.props;

    if (!this.socket) {
      this.socket = sockets.gameSocket;
      this.socket
                .on('fetch:match', handleFetchMatch)
                .on('fetch:record', handleFetchRecord);
      this.socket.connect();
    }
  }

  __vote(vote) {
    const { match } = this.props;

    if (this.socket) {
      this.socket.emit('send:action', { room: match.id, message: vote });
    }
  }

  __createMatch() {
    if (this.socket) {
      this.socket.emit('create:match');
    }
  }

  render() {
    const { match } = this.props;

    if (match.id) {
      if (match.userIds.length === 1) {
        return (<div> Still waiting for someone to join... </div>);
      } else if (match.userIds.length === 2) {
        return (
          <div>
            <RaisedButton
                primary type="button" onClick={() => {
                  this.__vote('ATTACK');
                }}
            >
                            Attack
                        </RaisedButton >
            <RaisedButton
                primary type="button" onClick={() => {
                  this.__vote('DEFEND');
                }}
            >
                            Defend
                        </RaisedButton >

            {match.live.length > 0 ? <ul>
              {match.live.map((record, index) => (
                <li key={index} > {`${record.senderId}: ${record.message}`}</li>)
                            )}
            </ul> : null}

          </div>
        );
      }
      return (<div> Match: {match.id} </div>);
    }

    return (
      <div> No matches are going.
                <RaisedButton
                    primary type="button"
                    onClick={() => { this.__createMatch(); }}
                >
                    Create one
                </RaisedButton >
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    match: state.get('match').toJSON(),
  }
);

const UserPanelContainer = connect(
    mapStateToProps,
  {
    handleFetchMatch: fetchMatchOnSocket,
    handleFetchRecord: fetchRecordOnSocket,
        // handleCreateMatch: createMatchThroughSocket,
  }
)(UserPanel);

export default UserPanelContainer;
