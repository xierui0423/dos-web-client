import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form/immutable';
import Slider from '../../../ui/slider/slider.jsx';
import validate from '../../validate';

const PlayerAttributesForm = ({ handleSubmit, previousPage }) => {
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
                max={20}
                min={1}
                step={1}
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

export default reduxForm({
    form: 'player',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate,
})(PlayerAttributesForm);
