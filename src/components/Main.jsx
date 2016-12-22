import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
// import Winner from './Winner.jsx';
// import Vote from './Vote.jsx';
import * as actionCreators from '../action-creators/action-creator';


export const Login = ({ value, handleChange }) => {

    const getValidationState = () => {
        const length = value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        return 'error';
    };

    return (<form>
        <FormGroup
            controlId="formBasicText"
            validationState={getValidationState()}
        >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
                type="text"
                value={value}
                placeholder="Enter text"
                onChange={handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
    </form>);
}

Login.propTypes = {
    value: React.PropTypes.string,
    handleChange: React.PropTypes.func,
};
//
// Voting.defaultProps = {
//     vote: (entry) => { console.log(`${entry} has been voted.`); },
// };
//
// /**
//  * Mapping function
//  */
// function mapStateToProps(state) {
//     return {
//         pair: state.getIn(['vote', 'pair']),
//         winner: state.get('winner'),
//         hasVoted: state.get('hasVoted'),
//     };
// }
//
// export const VotingContainer = connect(mapStateToProps, { vote: actionCreators.vote })(Voting);
