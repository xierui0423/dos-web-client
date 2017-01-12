import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { updateLoginForm, login } from './action-creators/login';

export const LoginForm = ({ loginData, handleUpdateLoginForm, handleLogin }) => {
    return (<div>

        <TextField
            id="login-username-ipt"
            type="text"
            hintText="Username"
            floatingLabelText="Username"
            value={loginData.get('username')}
            onChange={evt => handleUpdateLoginForm(loginData.set('username', evt.target.value))}
        /><br />

        <TextField
            id="login-password-ipt"
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            value={loginData.get('password')}
            onChange={evt => handleUpdateLoginForm(loginData.set('password', evt.target.value))}
        /><br />


        <RaisedButton primary type="button" onClick={() => handleLogin(loginData)} >
                    Login
                </RaisedButton >
    </div>);
};

LoginForm.propTypes = {
    loginData: ImmutablePropTypes.map,
    handleUpdateLoginForm: React.PropTypes.func,
    handleLogin: React.PropTypes.func,
};

const mapStateToProps = state => (
    {
        loginData: state.get('loginData'),
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
