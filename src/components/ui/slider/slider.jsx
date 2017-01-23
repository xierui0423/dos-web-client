import React from 'react';
import { Slider } from 'redux-form-material-ui';

class CustomSlider extends React.Component {

    // TODO --still can enhance the slider faulty recovery? Since this triggers warning out of range
    componentWillMount() {
        // This makes the slider always in range even given an invalid value at the beginning
        const val = this.props.input.value || 0;
        if (val < this.props.min || val > this.props.max) {
            this.props.input.onChange(Math.max(this.props.min, Math.min(this.props.max, val)));
        }
    }

    shouldComponentUpdate({ max, min, input }) {
        // This makes the slider always in range even given an invalid value on the update phase
        const val = input.value || 0;
        if (val < min || val > max) {
            input.onChange(Math.max(min, Math.min(max, val)));
            return false;
        }

        return true;
    }

    render() {
        const lengthPercent = this.props.scale && this.props.max
            ? this.props.max / this.props.scale : 0;

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
                    style={{
                        width: `calc((100% - 4rem)${lengthPercent ? `*${lengthPercent}` : ''}`,
                        display: 'inline-block',
                    }} {...this.props}
                />
            </div>
        );
    }


}

export default CustomSlider;
