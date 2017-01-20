import React from 'react';
import { Slider } from 'redux-form-material-ui';

class CustomSlider extends React.Component {

    shouldComponentUpdate({ max, min, input }) {
        // This makes the slider always in range even given an invalid value
        const val = input.value || 0;
        if (val < min || val > max) {
            input.onChange(Math.max(min, Math.min(max, val)));
            return false;
        }

        return true;
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} >
                <label
                    style={{ display: 'block' }}
                    htmlFor={
                        this.props.id}
                >
                    { this.props.label ? `${this.props.label}: ` : ''} {this.props.input.value }
                </label>

                <Slider
                    style={{ width: 'calc(100% - 4rem)', display: 'inline-block' }} {...this.props}
                />
            </div>
        );
    }
}

export default CustomSlider;
