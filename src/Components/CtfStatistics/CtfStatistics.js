import { FlagOutlined } from '@mui/icons-material'
import { Grid, SvgIcon, Typography, useTheme } from '@mui/material'
import { ReactComponent as CTFCertificate } from 'Assets/ctf.svg'
import { ReactComponent as GitlabPipeline } from 'Assets/gitlab.svg'
import { ReactComponent as P1Logo } from 'Assets/Logo_P1_Yodahead.svg'
import PropTypes from 'prop-types'
import React from 'react'
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
        <Grid container wrap = 'nowrap' columnSpacing = {0}>
            <Grid container item minWidth = '175px' width = '175px' direction = 'column' alignItems = 'center'>
                <Grid item>
                    <PieChart
                        data = {[{ color: theme.palette.success.main, value: ctfStat.value }]}
                        reveal = {ctfStat.value}
                        rounded
                        size = '150px'
                        lineWidth = {10}
                        label = {<Typography variant = 'h5'>{Number(ctfStat.value.toFixed(2))}%</Typography>}
                    />
                </Grid>
                <Grid container wrap = 'nowrap' justifyContent = 'center' spacing = {1}>
                    <Grid item style = {{ textAlign: 'center' }}>
                        <Typography variant = 'subtitle2' fontWeight = 'bold'>Platform One</Typography>
                    </Grid>
                    <Grid item>
                        <SvgIcon viewBox = '0 0 21 18'><P1Logo/></SvgIcon>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' marginY = 'auto'>
                {steps.map((label, index) => (
                    <Grid container item justifyContent = 'space-between' key = {index}>
                        <Grid container item wrap = 'nowrap' alignItems = 'center' xs spacing = {1}>
                            <Grid item>
                                <StepIcons index = {index} />
                            </Grid>
                            <Grid item>
                                <Typography variant = 'subtitle2' color = 'text.secondary'>{label}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item wrap = 'nowrap' alignItems = 'center' justifyContent = 'flex-end' xs>
                            <Grid item>
                                <Typography variant = 'h5' color = 'text.primary'>
                                    {data[index]?.count ?? 0}
                                </Typography>
                            </Grid>
                            <Grid item alignSelf = 'flex-start'>
                                <Typography
                                    color = 'text.secondary'
                                    variant = 'caption'
                                    style = {{ paddingLeft: '4px' }}
                                >
                                    / {data[index]?.total ?? 0}
                                </Typography>
                            </Grid>
                        </Grid>
                        {index < 2 && (
                            <Grid
                                item
                                xs = {12}
                                marginLeft = '12px'
                                style = {{
                                    height: '20px',
                                    borderLeft: '1px solid',
                                    borderLeftColor: theme.palette.divider
                                }}
                            />
                        )}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}


CtfStatistics.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        count: PropTypes.number,
        total: PropTypes.number,
    })).isRequired
}

export default CtfStatistics