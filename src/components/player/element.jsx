import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { updateStep } from './action-creators/player';

export const PlayerCreator = ({ playerData, handleUpdateStep }) => {
    const stepIndex = playerData.get('createStep') - 1;

    return (<div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
            <Step>
                <StepLabel>Select campaign settings</StepLabel>
            </Step>
            <Step>
                <StepLabel>Create an ad group</StepLabel>
            </Step>
            <Step>
                <StepLabel>Create an ad</StepLabel>
            </Step>
        </Stepper>
        <div style={{ margin: '0 16px' }}>
            <div>
                <div style={{ marginTop: 12 }}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={() => handleUpdateStep(false)}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        disabled={stepIndex === 2}
                        primary
                        onTouchTap={() => handleUpdateStep(true)}
                    />
                </div>
            </div>
        </div>
    </div>);
};

PlayerCreator.propTypes = {
    playerData: ImmutablePropTypes.map,
    handleUpdateStep: React.PropTypes.func,
};

const mapStateToProps = state => (
    {
        playerData: state.get('playerData'),
    }
);

const PlayerCreatorContainer = connect(
    mapStateToProps,
    {
        handleUpdateStep: updateStep,
    }
)(PlayerCreator);

export default PlayerCreatorContainer;
