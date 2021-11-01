import { FlagOutlined } from '@mui/icons-material'
import { Link, Step, StepLabel, Stepper, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material'
import { ReactComponent as CTFCertificate } from 'Assets/ctf.svg'
import { ReactComponent as GitlabPipeline } from 'Assets/gitlab.svg'
import { ReactComponent as JiraLogo } from 'Assets/jiraLogo.svg'
import PropTypes from 'prop-types'
import React from 'react'

function StepIcons({ index, completed }) {
    const theme = useTheme()

    const icons = [
        <FlagOutlined key = {index} fontSize = 'medium' style = {{ color: 'inherit' }}/>,
        <SvgIcon key = {index} style = {{ fontSize: '20px', color: 'inherit' }}><GitlabPipeline/></SvgIcon>,
        <SvgIcon key = {index} style = {{ fontSize: '19px', color: 'inherit' }}><CTFCertificate /></SvgIcon>,
    ]

    return (
        <div
            data-testid = {`DevelopmentStepper__icon-${index}`}
            style = {{
                borderRadius: '50%',
                border: '1px solid',
                height: '33px',
                width: '33px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: .75,
                borderColor: completed ? theme.palette.text.primary : theme.palette.text.secondary,
                color: completed ? theme.palette.text.primary : theme.palette.text.secondary
            }}
        >
            {icons[index]}
        </div>
    )
}

StepIcons.propTypes = {
    index: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired
}

function Connector({ completed }) {
    const theme = useTheme()

    return (
        <div
            data-testid = {`DevelopmentStepper__connector-completed-${completed}`}
            style = {{
                marginLeft: '15px',
                width: '18px',
                minHeight: '52px',
                opacity: .75,
                borderLeftWidth: '2px',
                borderLeftStyle: completed ? 'solid' : 'dashed',
                borderLeftColor: completed ? theme.palette.text.primary : theme.palette.text.secondary
            }}
        />
    )
}

Connector.propTypes = {
    completed: PropTypes.bool.isRequired
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
function DevelopmentStepper({ completedIndex }) {

    const icons = [0, 1, 2]
    const titles = ['Jira onboarding request not submitted', 'Pipelines not created', 'Project does not has CtF']

    const parseTitle = (currentIndex) => {
        if (completedIndex >= currentIndex) return titles[currentIndex].replace('not ', '')
        else return titles[currentIndex]
    }

    return (
        <Stepper
            orientation = 'vertical'
            style = {{ backgroundColor: 'transparent', padding: 0 }}
            connector = {null}
        >
            {icons.map(i =>
                <Step key = {i} completed = {completedIndex >= i }>
                    {i > 0 && <Connector completed = {completedIndex >= i }/>}
                    <Tooltip
                        arrow
                        placement = 'left'
                        title = {tooltipTitle(parseTitle([i]))}
                    >
                        <StepLabel
                            StepIconComponent = {() => <StepIcons index = {i} completed = {completedIndex >= i }/>}
                        />
                    </Tooltip>
                </Step>
            )}
        </Stepper>
    )
}

DevelopmentStepper.propTypes = {
    completedIndex: PropTypes.number.isRequired
}

export default DevelopmentStepper