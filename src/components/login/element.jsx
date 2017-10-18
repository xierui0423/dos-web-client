import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from '@gfpacheco/redux-form-material-ui';
import { Button, Paper, Divider } from 'material-ui';
import { login } from './action-creators/login';

const LoginForm = ({ handleSubmit, pristine, submitting, handleLogin }) =>
    (<Paper>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Field
          name="username"
          component={TextField}
          id="login-username-ipt"
          type="text"
          placeholder="Username"
          label="Username"
        />
        <Divider />
        <Field
          name="password"
          component={TextField}
          id="login-password-ipt"
          type="password"
          placeholder="Password"
          label="Password"
        />
        <Divider />
        <Button raised color="primary" type="submit" disabled={pristine || submitting} >
                Login
            </Button >
      </form>
    </Paper>);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(() => ({}), {
  handleLogin: login,
})(reduxForm({
  form: 'login',  // a unique identifier for this form
})(LoginForm));
