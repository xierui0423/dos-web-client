import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import Slider from '../../../ui/slider/slider.jsx';
import { validate, attributesValidation} from '../../validate';

const PlayerAttributesForm = ({ handleSubmit, previousPage, height, weight }) => {
    const attributes = [
        { name: 'speed', label: 'Speed' },
        { name: 'agility', label: 'Agility' },
        { name: 'strength', label: 'Strength' },
        { name: 'pass', label: 'Pass' },
        { name: 'control', label: 'Control' },
        { name: 'tackle', label: 'Tackle' },
        { name: 'head', label: 'Header' },
        { name: 'shoot', label: 'Shoot' },
        { name: 'flair', label: 'Flair' },
    ];

    return (
        <form onSubmit={handleSubmit} >
            {attributes.map((attribute, index) => (<Field
                key={index}
                format={value => value === '' ? 0 : value}
                name={attribute.name}
                component={Slider}
                id={`player-${attribute.name}-sld`}
                label={attribute.label}
                max={attributesValidation(height, weight)[attribute.name]}
                min={5}
                step={1}
                scale={20}
            />))}

            <div>
                <RaisedButton
                    type="button"
                    className="next"
                    onClick={previousPage}
                >
                    Previous
                </RaisedButton>
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
})(PlayerAttributesForm));
