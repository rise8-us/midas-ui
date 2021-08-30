import { alpha, Grid, Typography, useTheme } from '@material-ui/core'
import { DevelopmentSecurityRatings } from 'Components/DevelopmentSecurityRatings'
import { DevelopmentStepper } from 'Components/DevelopmentStepper'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProjectsByProductId } from 'Redux/Projects/selectors'

const buildLine = (rotDeg, shift, color) => {
    const left = ', rgba(0,0,0,0) calc(' + shift + '% - 1px), '
    const right = 'rgba(0,0,0,0) calc(' + shift + '% + 1px))'
    return 'linear-gradient(' + rotDeg + left + color + ' ' + shift + '%, ' + right
}

function DiagonalLines({ color }) {
    return (
        <div
            style = {{
                width: '22px',
                height: '100%',
                background: buildLine('134deg', 39, alpha(color, .4)) + ', ' +
                    buildLine('154deg', 46, alpha(color, .4)) + ', ' +
                    buildLine('192deg', 54, alpha(color, .4)) + ', ' +
                    buildLine('226deg', 61, alpha(color, .4))
            }}
        />
    )
}

DiagonalLines.propTypes = {
    color: PropTypes.string.isRequired
}

const calculateStep = (projectJourneyMapBit) => Math.log2(projectJourneyMapBit + 1) - 1

const determineColor = (indicatorValue, theme) => {
    if (indicatorValue === 'A' || indicatorValue >= 80) return theme.palette.success.main
    else if (['B', 'C'].includes(indicatorValue) || indicatorValue >= 55) return theme.palette.warning.main
    else if (['D', 'E'].includes(indicatorValue) || indicatorValue < 55) return theme.palette.error.main
    else return theme.palette.info.main
}
function ProductDevelopment({ id }) {
    const theme = useTheme()

    const projects = useSelector(state => selectProjectsByProductId(state, id))

    return (
        <Grid container spacing = {2}>
            {projects.map((project, key) => (
                <Grid container item direction = 'column' spacing = {1} key = {key} style = {{ width: '225px' }}>
                    <Grid item>
                        <Typography
                            variant = 'body2'
                            color = 'textSecondary'
                            style = {{
                                textTransform: 'uppercase',
                                fontStyle: 'italic'
                            }}
                        >
                            {project.name}
                        </Typography>
                    </Grid>
                    <Grid container item wrap = 'nowrap'>
                        <Grid item s = {2} m = {1}>
                            <DevelopmentStepper completedIndex = {calculateStep(project.projectJourneyMap)} />
                        </Grid>
                        <Grid item s = {2} m = {2} style = {{ marginRight: '10px' }}>
                            <DiagonalLines color = {theme.palette.text.secondary} />
                        </Grid>
                        <DevelopmentSecurityRatings
                            codeCoverage = {{
                                value: project.coverage.testCoverage,
                                color: determineColor(project.coverage.testCoverage, theme)
                            }}
                            security = {{
                                value: project.coverage.securityRating,
                                color: determineColor(project.coverage.securityRating, theme)
                            }}
                            reliability = {{
                                value: project.coverage.reliabilityRating,
                                color: determineColor(project.coverage.reliabilityRating, theme)
                            }}
                            maintainability = {{
                                value: project.coverage.maintainabilityRating,
                                color: determineColor(project.coverage.maintainabilityRating, theme)
                            }}
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

ProductDevelopment.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProductDevelopment