import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

import { connect } from 'react-redux';
import { updateStep, createPlayer } from './action-creators/player';
import FirstStepForm from './_subviews/1-player-basic/element.jsx';
import SecondStepForm from './_subviews/2-player-attributes/element.jsx';
import ThirdStepForm from './_subviews/3-player-skills/element.jsx';

export class PlayerCreator extends React.Component {

    // componentWillMount() {
    //     // Retrieve the user data if it doesn't exist
    //     if (!this.props.playerData.get('id')) {
    //         this.props.handleFetchUser();
    //     }
    // }

    render() {
        const { initialValues, handleUpdateStep, handleCreatePlayer } = this.props;

        const stepIndex = initialValues.get('createStep') - 1;

        return (<div style={{ width: '100%', maxWidth: 700, margin: 'auto' }} >
            <Stepper activeStep={stepIndex} >
                <Step>
                    <StepLabel>Form the body shape</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Assign attributes</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Equip skills</StepLabel>
                </Step>
            </Stepper>

            <div>
                {stepIndex === 0 &&
                <FirstStepForm
                    initialValues={initialValues}
                    onSubmit={() => handleUpdateStep(true)}
                />}
                {stepIndex === 1 &&
                <SecondStepForm
                    initialValues={initialValues}
                    previousPage={() => handleUpdateStep(false)}
                    onSubmit={() => handleUpdateStep(true)}
                />}
                {stepIndex === 2 &&
                <ThirdStepForm
                    initialValues={initialValues}
                    previousPage={() => handleUpdateStep(false)}
                    onSubmit={handleCreatePlayer}
                />}
            </div>

        </div>);
    }
};

const mapStateToProps = state => (
    {
        initialValues: state.get('playerData'),
        // userData: state.get('userData'),
    }
);

const PlayerCreatorContainer = connect(
    mapStateToProps,
    {
        handleCreatePlayer: createPlayer,
        handleUpdateStep: updateStep,
    }
)(PlayerCreator);

export default PlayerCreatorContainer;
