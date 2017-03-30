import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import Slider from '../../../ui/slider/slider.jsx';
import validate, { getAttributeUpperLimit } from './validate';
import { attributes } from '../../helper';

const PlayerAttributesForm = (
    {
        error,
        handleSubmit,
        previousPage,
        height,
        weight,
    }) => (
      <form onSubmit={handleSubmit} >
        {attributes.map((attribute, index) => (<Field
            key={index}
            format={value => value === '' ? 0 : value}
            name={attribute.name}
            component={Slider}
            id={`player-${attribute.name}-sld`}
            label={attribute.label}
            max={getAttributeUpperLimit(height, weight)[attribute.name]}
            min={5}
            step={1}
            scale={20}
        />))}

        <div>
          {error && <strong>{error}</strong>}
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

const selector = formValueSelector('player');

export default connect(state => ({
  height: selector(state, 'height'),
  weight: selector(state, 'weight'),
  experience: state.get('playerData').experience,
}))(reduxForm({
  form: 'player',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate,
})(PlayerAttributesForm));
