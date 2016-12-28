import React from 'react';
import {
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Button,
    HelpBlock,
} from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { updateLoginForm, login } from './action-creators.js';

export const LoginForm = ({ loginData, userData, handleUpdateLoginForm, handleLogin }) => {
    const getValidationState = () =>
        // const length = value.length;
        // if (length > 10) return 'success';
        // else if (length > 5) return 'warning';
        'error';

    return (<Form horizontal >
        <FormGroup
            validationState={getValidationState()}
            controlId="login-username-grp"
        >
            <Col sm={2} >
                <ControlLabel>Username:</ControlLabel>
            </Col>
            <Col sm={10} >
                <FormControl
                    className="login-username-ipt"
                    type="text"
                    value={loginData.get('username')}
                    placeholder="Enter username......"
                    onChange={evt => handleUpdateLoginForm(loginData.set('username', evt.target.value))}
                />
            </Col>
            <FormControl.Feedback />
        </FormGroup>

        <FormGroup
            validationState={getValidationState()}
            controlId="login-password-grp"
        >
            <Col sm={2} >
                <ControlLabel>Password:</ControlLabel>
            </Col>
            <Col sm={10} >
                <FormControl
                    className="login-password-pwd"
                    type="password"
                    value={loginData.get('password')}
                    placeholder="Enter password..."
                    onChange={evt => handleUpdateLoginForm(loginData.set('password', evt.target.value))}
                />
            </Col>
            <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10} >
                <Button type="button" onClick={() => handleLogin(loginData)} >
                    Sign in
                </Button>
            </Col>
        </FormGroup>
        <HelpBlock>{userData.get('id') ? userData.get('id') : 'Validation is based on string length.'}</HelpBlock>
    </Form>);
};

LoginForm.propTypes = {
    loginData: ImmutablePropTypes.map,
    userData: ImmutablePropTypes.map,
    handleUpdateLoginForm: React.PropTypes.func,
    handleLogin: React.PropTypes.func,
};

const mapStateToProps = state => (
    {
        loginData: state.get('loginData'),
        userData: state.get('userData'),
    }
);

const LoginFormContainer = connect(
    mapStateToProps,
    {
        handleUpdateLoginForm: updateLoginForm,
        handleLogin: login,
    }
)(LoginForm);

export default LoginFormContainer;
