import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

import { connect } from 'react-redux';
import { updateStep, createPlayer, fetchPlayer } from './action-creators/player';
import FirstStepForm from './_subviews/1-player-basic/element.jsx';
import SecondStepForm from './_subviews/2-player-attributes/element.jsx';
import ThirdStepForm from './_subviews/3-player-skills/element.jsx';
import { attributes, basicInfo } from './helper';

export class PlayerCreator extends React.Component {

    componentWillMount() {
        // Retrieve the user data if it doesn't exist
        if (!this.props.initialValues.get('userId')) {
            this.props.handleFetchPlayer();
        }
    }

    render() {
        const { initialValues, handleUpdateStep, handleCreatePlayer } = this.props;

        if (!initialValues.get('userId') && initialValues.get('retrieved')) {
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
        } else if (!initialValues.get('retrieved')) {
            return null;
        }
        return (<ul>
            {basicInfo.concat(attributes).map(attribute => (
                <li key={attribute.name} >
                    <label htmlFor={attribute.name} >{attribute.label}: </label>
                    {initialValues.get(attribute.name)}
                </li>))}
        </ul>);
    }
}

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
        handleFetchPlayer: fetchPlayer,
    }
)(PlayerCreator);

export default PlayerCreatorContainer;
