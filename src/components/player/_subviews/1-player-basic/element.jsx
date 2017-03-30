import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import Slider from '../../../ui/slider/slider.jsx';
import validate from './validate';


const PlayerBasicForm = ({ height, handleSubmit }) => {
  const heightSquare = Math.pow(height / 100, 2);
  const maxWeight = Math.ceil(heightSquare * 24.9);
  const minWeight = Math.floor(heightSquare * 18.5);

  return (
    <form onSubmit={handleSubmit} >
      <Field
          name="name"
          component={TextField}
          id="player-name-ipt"
          type="text"
          hintText="Username"
          floatingLabelText="Username"
          floatingLabelFixed
      />

      <Field
          format={value => value === '' ? 0 : value}
          name="height"
          component={Slider}
          id="player-height-sld"
          label="Height"
          max={210}
          min={155}
          step={1}
      />

      <Field
          format={value => value === '' ? 0 : value}
          name="weight"
          component={Slider}
          id="player-weight-sld"
          label="Weight"
          max={maxWeight}
          min={minWeight}
          step={1}
      />
      <div>
        <RaisedButton type="submit" className="next" >Next</RaisedButton>
      </div>
    </form>
  );
};

const selector = formValueSelector('player');

export default connect(state => ({
  height: selector(state, 'height'),
  weight: selector(state, 'weight'),
}))(reduxForm({
  form: 'player',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate,
})(PlayerBasicForm));
