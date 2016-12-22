import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { change } from '../action-creators/action-creator.js';


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
                onChange={evt => handleChange(evt.target.value)}
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

function mapStateToProps(state) {
    return {
        value: state.get('value'),
    };
}

export const LoginContainer
    = connect(mapStateToProps, { handleChange: change })(Login);
