import { Grid, Stack, Tooltip, Typography } from '@mui/material'
import { CircularStatus } from 'Components/CircularStatus'
import { SonarqubeTooltip } from 'Components/SonarqubeTooltip'
import PropTypes from 'prop-types'
import React from 'react'

function SecurityRow({ displayValue, totalValue, color, title, tooltipTitle }) {
    return (
        <Tooltip
            title = {tooltipTitle}
            placement = 'left'
            arrow
        >
            <Grid container item wrap = 'nowrap' alignItems = 'center' style = {{ maxHeight: '35px' }}>
                <Grid item>
                    <CircularStatus
                        thickness = {3}
                        displayValue = {displayValue}
                        value = {totalValue}
                        size = {24}
                        fontSize = '.675rem'
                        style = {{
                            color: color,
                            borderRadius: '50%',
                            boxShadow: '0 0 15px 0'
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography color = 'text.secondary' style = {{ paddingLeft: '8px', height: '29px' }}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </Tooltip>
    )
}

SecurityRow.propTypes = {
    displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    totalValue: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tooltipTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
}

function DevelopmentSecurityRatings({ codeCoverage, security, reliability, maintainability, ...urls }) {
    const { projectSonarqubeUrl, projectPipelineUrl } = urls

    return (
        <Stack>
            <SecurityRow
                title = 'Coverage'
                totalValue = {codeCoverage.value}
                displayValue = {codeCoverage.value}
                color = {codeCoverage.color}
                tooltipTitle = {
                    <SonarqubeTooltip
                        pipelineUrl = {projectPipelineUrl}
                        sonarqubeUrl = {projectSonarqubeUrl}
                        message = {codeCoverage.tooltipMessage}
                    />
                }
            />
            <SecurityRow
                title = 'Security'
                totalValue = {100}
                displayValue = {security.value}
                color = {security.color}
                tooltipTitle = {
                    <SonarqubeTooltip
                        pipelineUrl = {projectPipelineUrl}
                        sonarqubeUrl = {projectSonarqubeUrl}
                        message = {security.tooltipMessage}
                    />
                }
            />
            <SecurityRow
                title = 'Reliability'
                totalValue = {100}
                displayValue = {reliability.value}
                color = {reliability.color}
                tooltipTitle = {
                    <SonarqubeTooltip
                        pipelineUrl = {projectPipelineUrl}
                        sonarqubeUrl = {projectSonarqubeUrl}
                        message = {reliability.tooltipMessage}
                    />
                }
            />
            <SecurityRow
                title = 'Maintainability'
                totalValue = {100}
                displayValue = {maintainability.value}
                color = {maintainability.color}
                tooltipTitle = {
                    <SonarqubeTooltip
                        pipelineUrl = {projectPipelineUrl}
                        sonarqubeUrl = {projectSonarqubeUrl}
                        message = {maintainability.tooltipMessage}
                    />
                }
            />
        </Stack>
    )
}

DevelopmentSecurityRatings.propTypes = {
    codeCoverage: PropTypes.shape({
        value: PropTypes.number,
        color: PropTypes.string,
        tooltipMessage: PropTypes.string
    }).isRequired,
    security: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string,
        tooltipMessage: PropTypes.string
    }).isRequired,
    reliability: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string,
        tooltipMessage: PropTypes.string
    }).isRequired,
    maintainability: PropTypes.shape({
        value: PropTypes.oneOf(['U', 'A', 'B', 'C', 'D', 'E']),
        color: PropTypes.string,
        tooltipMessage: PropTypes.string
    }).isRequired,
    projectPipelineUrl: PropTypes.string,
    projectSonarqubeUrl: PropTypes.string
}

DevelopmentSecurityRatings.defaultProps = {
    projectPipelineUrl: null,
    projectSonarqubeUrl: null
}

export default DevelopmentSecurityRatings