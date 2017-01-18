import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import Slider from '../../../ui/slider/slider.jsx';
import validate from '../../validate';

const PlayerBasicForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
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
            max={110}
            min={45}
            step={1}
        />
        <div>
            <RaisedButton type="submit" className="next" >Next</RaisedButton>
        </div>
    </form>
    );

export default reduxForm({
    form: 'player',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate,
})(PlayerBasicForm);
