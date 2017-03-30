import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import validate from './validate';

const PlayerSkillsForm = ({ handleSubmit, previousPage }) => (
  <form onSubmit={handleSubmit} >
    <Field
        name="skills"
        component={TextField}
        id="player-skills-ipt"
        type="text"
        hintText="Skills"
        floatingLabelText="Skills"
        floatingLabelFixed
    />
    <div>
      <RaisedButton
          type="button"
          className="next"
          onClick={previousPage}
      >
                    Previous
            </RaisedButton>
      <RaisedButton type="submit" className="next" >Create</RaisedButton>
    </div>
  </form>
    );

export default reduxForm({
  form: 'player',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate,
})(PlayerSkillsForm);
