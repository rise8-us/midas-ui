import { Link, Step, StepConnector, StepLabel, Stepper, SvgIcon, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { ReactComponent as JiraLogo } from '../../Assets/jiraLogo.svg'

function IconStepper({ icons, steps, currentStep, tooltip, padding, orientation }) {

    const tooltipTitle = (label) => (
        <>
            <Typography>{label}</Typography>
            { label.includes('Jira') &&
                <Link
                    href = {'https://jira.il2.dso.mil/secure/RapidBoard.jspa?rapidView=142&quickFilter=422'}
                    target = '_blank'
                    rel = 'noopener noreferrer'
                    style = {{
                        display: 'flex',
                        marginTop: '24px',
                        alignItems: 'center'
                    }}
                >
                    <SvgIcon fontSize = 'small'><JiraLogo /></SvgIcon>
                    <Typography style = {{ paddingLeft: '4px' }}>P1 IL2 Jira Kanban board</Typography>
                </Link>
            }
        </>
    )

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
                        <Tooltip
                            arrow
                            interactive
                            placement = 'bottom'
                            title = {tooltipTitle(label)}
                        >
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