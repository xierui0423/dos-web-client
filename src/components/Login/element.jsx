import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from './action-creators/login';

const LoginForm = ({ handleSubmit, pristine, submitting, handleLogin }) =>
    (<form onSubmit={handleSubmit(handleLogin)} >

        <Field
            name="username"
            component={TextField}
            id="login-username-ipt"
            type="text"
            hintText="Username"
            floatingLabelText="Username"
            floatingLabelFixed
        />

        <Field
            name="password"
            component={TextField}
            id="login-password-ipt"
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            floatingLabelFixed
        />

        <RaisedButton primary type="submit" disabled={pristine || submitting}>
            Login
        </RaisedButton >
    </form>);

export default connect(undefined, {
    handleLogin: login,
})(reduxForm({
    form: 'login',  // a unique identifier for this form
    onSubmit: login,
})(LoginForm));
