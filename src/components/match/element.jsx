import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchMatch, createMatch, beginMatch, receiveRecord } from './action-creators/match';

class UserPanel extends React.Component {

    componentWillMount() {
        // Retrieve the user data if it doesn't exist
        if (!this.props.match.id) {
            this.props.handleFetchMatch();
        }
    }

    componentDidMount() {
        this.__createSocket();
    }

    componentDidUpdate() {
        this.__createSocket();
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    __createSocket() {
        const { match, handleBeginMatch, handleReceiveRecord } = this.props;

        // Check if there is an ongoing match
        if (match.id && match.userIds.length === 2) {
            // If the socket connection does't exist, establish it

            if (!this.socket) {
                this.socket = io.connect('localhost:9999');
                this.socket.on('connect', () => {
                    handleBeginMatch();
                    this.socket.emit('joinRoom', match.id);
                }).on('disconnect', () => {
                    console.log('disconnected');
                }).on('receive', (msg) => {
                    handleReceiveRecord(msg);
                });
            }
        }
    }

    __vote(vote) {
        const { match } = this.props;

        if (this.socket) {
            this.socket.emit('send', { room: match.id, message: vote });
        }
    }

    render() {
        const { match, handleCreateMatch } = this.props;

        if (match.id) {
            if (match.userIds.length === 1) {
                return (<div> Still waiting for someone to join... </div>);
            } else if (match.isMatchGoing) {
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
                            {match.live.map((record, index) => (<li key={index}> {`${record.senderId}: ${record.message}`}</li>)

                                )}
                        </ul> : null}

                    </div>
                );
            }
            return (<div> Match: {match.id} </div>);
        }

        return (
            <div> No matches are going.
                <RaisedButton primary type="button" onClick={handleCreateMatch} >
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
        handleFetchMatch: fetchMatch,
        handleCreateMatch: createMatch,
        handleBeginMatch: beginMatch,
        handleReceiveRecord: receiveRecord,
    }
)(UserPanel);

export default UserPanelContainer;