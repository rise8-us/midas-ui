import { Grid, Link, Typography } from '@mui/material'
import { ReactComponent as SonarqubeLogo } from 'Assets/sonarqubeLogo.svg'
import PropTypes from 'prop-types'
import React from 'react'

function SonarqubeTooltip({ message, pipelineUrl, sonarqubeUrl }) {
    return (
        <Grid container direction = 'column'>
            <Grid item>
                <Link
                    href = {'https://docs.sonarqube.org/latest/user-guide/metric-definitions/'}
                    target = '_blank'
                    rel = 'noopener noreferrer'
                >
                    <SonarqubeLogo />
                </Link>
            </Grid>
            <Grid item>
                <Typography>{message}</Typography>
            </Grid>
            <Grid container item justifyContent = 'space-between'>
                <Grid item>
                    {pipelineUrl &&
                        <Typography variant = 'body2' style = {{ minWidth: '120px' }}>
                            <Link href = {pipelineUrl} target = '_blank' rel = 'noopener noreferrer'>
                                Gitlab Pipeline
                            </Link>
                        </Typography>
                    }
                </Grid>
                <Grid item>
                    {sonarqubeUrl &&
                        <Typography variant = 'body2' style = {{ minWidth: '120px' }}>
                            <Link href = {sonarqubeUrl} target = '_blank' rel = 'noopener noreferrer'>
                                SonarQube Project
                            </Link>
                        </Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

SonarqubeTooltip.propTypes = {
    message: PropTypes.string,
    pipelineUrl: PropTypes.string,
    sonarqubeUrl: PropTypes.string
}

SonarqubeTooltip.defaultProps = {
    message: 'No Data',
    pipelineUrl: null,
    sonarqubeUrl: null
}

export default SonarqubeTooltip