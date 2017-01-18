import React from 'react';
import { Slider } from 'redux-form-material-ui';

const CustomSlider = props => (
    <div style={{ textAlign: 'center' }}>
        <label style={{ display: 'block' }} htmlFor={props.id} >{props.label ? `${props.label}: ` : ''} {props.input.value}</label>
        <Slider style={{ width: 'calc(100% - 4rem)', display: 'inline-block' }} {...props} />
    </div>
);

export default CustomSlider;
