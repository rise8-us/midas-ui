import { Step, StepConnector, StepLabel, Stepper, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function IconStepper({ icons, steps, currentStep, tooltip }) {

    return (
        <Stepper
            alternativeLabel
            activeStep = {currentStep}
            connector = {<StepConnector />}
        >
            {steps.map((label, index) => (
                <Step key = {index} >
                    { tooltip ?
                        <Tooltip arrow placement = 'bottom' title = {label}>
                            <StepLabel StepIconComponent = {icons} />
                        </Tooltip>
                        :
                        <StepLabel StepIconComponent = {icons}>{label}</StepLabel>
                    }
                </Step>
            ))}
        </Stepper>
    )
}

IconStepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentStep: PropTypes.number.isRequired,
    tooltip: PropTypes.bool,
    icons: PropTypes.func
}

IconStepper.defaultProps = {
    icons: undefined,
    tooltip: false
}

export default IconStepper