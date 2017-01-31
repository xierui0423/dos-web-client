import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchMatch, createMatch } from './action-creators/match';

class UserPanel extends React.Component {

    componentWillMount() {
        // Retrieve the user data if it doesn't exist
        if (!this.props.match.id) {
            this.props.handleFetchMatch();
        }
    }

    render() {
        const { match, handleCreateMatch } = this.props;

        if (match.id) {
            if (match.userIds.length === 1) {
                return (<div> Still waiting for someone to join... </div>);
            }
            return (<div> Match: {match.id} </div>);
        }

        return (
            <div> No matches are going.
                <RaisedButton primary type="button" onClick={handleCreateMatch}>
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
    }
)(UserPanel);

export default UserPanelContainer;
