import { Grid, Step, StepLabel, Stepper, SvgIcon, Typography, useTheme } from '@material-ui/core'
import { FlagOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { ReactComponent as CTFCertificate } from '../../Assets/ctf.svg'
import { ReactComponent as GitlabPipeline } from '../../Assets/gitlab.svg'
import { ReactComponent as P1Logo } from '../../Assets/Logo_P1_Yodahead.svg'
import { PieChart } from '../PieChart'

function StepIcons({ index }) {

    const icons = [
        <FlagOutlined key = {index} fontSize = 'small'/>,
        <SvgIcon key = {index} style = {{ fontSize: '18px' }}><GitlabPipeline/></SvgIcon>,
        <SvgIcon key = {index} style = {{ fontSize: '16px' }}><CTFCertificate /></SvgIcon>,
    ]

    return (
        <div
            style = {{
                borderRadius: '50%',
                border: '1px solid',
                height: '26px',
                width: '26px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {icons[index]}
        </div>
    )
}

StepIcons.propTypes = {
    index: PropTypes.number.isRequired,
}

function CtfStatistics({ data }) {
    const theme = useTheme()

    const ctfStat = data.find(s => s.name === 'CTF') ?? { value: 0 }

    const steps = ['Onboarded', 'Pipelines', 'Certificate to Field']

    return (
        <Grid container wrap = 'nowrap'>
            <Grid item style = {{ textAlign: 'center' }}>
                <PieChart
                    data = {[{ color: theme.palette.success.main, value: ctfStat.value }]}
                    reveal = {ctfStat.value}
                    rounded
                    size = '150px'
                    lineWidth = {10}
                    label = {<Typography variant = 'h5'>{Number(ctfStat.value.toFixed(2))}%</Typography>}
                />
                <Grid container wrap = 'nowrap' justify = 'center' spacing = {1}>
                    <Grid item style = {{ textAlign: 'center' }}>
                        <Typography variant = 'subtitle2' style = {{ fontWeight: 'bold' }}>Platform One</Typography>
                    </Grid>
                    <Grid item>
                        <SvgIcon viewBox = '0 0 21 18'><P1Logo/></SvgIcon>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item style = {{ width: '100%' }}>
                <Stepper
                    activeStep = {-1}
                    orientation = 'vertical'
                    style = {{ backgroundColor: 'transparent', paddingTop: 0 }}
                >
                    {steps.map((label, index) => (
                        <Step key = {index}>
                            <StepLabel StepIconComponent = { () => <StepIcons index = {index} /> }>
                                <Grid container justify = 'space-between' alignItems = 'center'>
                                    <Grid item >
                                        <Typography variant = 'subtitle2' color = 'textSecondary'>{label}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant = 'h5' color = 'textPrimary'>
                                            {data[index]?.count ?? 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
        </Grid>
    )
}


CtfStatistics.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        count: PropTypes.number
    })).isRequired
}

export default CtfStatistics