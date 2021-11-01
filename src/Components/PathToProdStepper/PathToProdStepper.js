import { Flag } from '@mui/icons-material'
import { Grid, Link, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material'
import { ReactComponent as CTFCertificate } from 'Assets/ctf.svg'
import { ReactComponent as GitlabPipeline } from 'Assets/gitlab.svg'
import { ReactComponent as JiraLogo } from 'Assets/jiraLogo.svg'
import PropTypes from 'prop-types'
import React from 'react'

function StepIcons({ active, completed, icon }) {

    const theme = useTheme()
    const icons = {
        0: <Flag />,
        1: <SvgIcon><GitlabPipeline/></SvgIcon>,
        2: <SvgIcon style = {{ marginTop: '3px' }}><CTFCertificate /></SvgIcon>,
    }

    const bg = () => {
        if (active) return theme.palette.error.main
        else if (completed) return theme.palette.success.main
        return 'transparent'
    }

    return (
        <div
            style = {{
                width: 34,
                height: 34,
                display: 'flex',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bg(),
                color: !active && !completed ? theme.palette.text.secondary : theme.palette.text.primary
            }}
        >
            {icons[icon]}
        </div>
    )
}

StepIcons.propTypes = {
    active: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    icon: PropTypes.number.isRequired,
}

function Connector({ startCompleted, endCompleted }) {
    const theme = useTheme()

    let startColor = theme.palette.secondary.main
    let endColor = theme.palette.secondary.main

    if (startCompleted === true && endCompleted === false) {
        startColor = theme.palette.success.main
        endColor = theme.palette.error.main
    } else if (startCompleted === true && endCompleted === true) {
        startColor = theme.palette.success.main
        endColor = theme.palette.success.main
    }

    return (
        <div
            data-testid = {`DevelopmentStepper__connector-${startCompleted}-${endCompleted}`}
            style = {{
                minWidth: '92px',
                height: '2px',
                opacity: .75,
                background: `linear-gradient(90deg, ${startColor} 49%, ${endColor} 100%)`
            }}
        />
    )
}

Connector.propTypes = {
    startCompleted: PropTypes.bool.isRequired,
    endCompleted: PropTypes.bool.isRequired
}

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
function PathToProdStepper({ step }) {

    const steps = ['Jira onboarding request submitted', 'Pipelines', 'CTF']

    return (
        <Grid container wrap = 'nowrap' justifyContent = 'center' alignItems = 'center' style = {{ height: '48px' }}>
            {steps.map((label, index) => (
                <React.Fragment key = {index}>
                    <Grid item>
                        <Tooltip arrow placement = 'bottom' title = {tooltipTitle(label)}>
                            <div style = {{ borderRadius: '50%' }}>
                                <StepIcons
                                    active = {step === index}
                                    completed = {step >= index}
                                    icon = {index}
                                />
                            </div>
                        </Tooltip>
                    </Grid>
                    {index !== (steps.length - 1) &&
                        <Grid item>
                            <Connector
                                startCompleted = {index < step}
                                endCompleted = {index + 1 < step}
                            />
                        </Grid>
                    }
                </React.Fragment>
            ))}
        </Grid>
    )
}

PathToProdStepper.propTypes = {
    step: PropTypes.number.isRequired
}

export default PathToProdStepper