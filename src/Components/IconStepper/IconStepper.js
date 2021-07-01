import { Step, StepConnector, StepLabel, Stepper, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function IconStepper({ icons, steps, currentStep, tooltip, padding, orientation }) {

    return (
        <Stepper
            alternativeLabel
            orientation = {orientation}
            activeStep = {currentStep}
            connector = {<StepConnector />}
            style = {{ padding, backgroundColor: 'inherit' }}
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
    icons: PropTypes.func,
    padding: PropTypes.string,
    orientation: PropTypes.oneOf(['vertical', 'horizontal'])
}

IconStepper.defaultProps = {
    icons: undefined,
    tooltip: false,
    padding: '20px',
    orientation: 'horizontal'
}

export default IconStepper