import {
    Box, Card, CardContent, CardHeader, IconButton, makeStyles, Tooltip, useTheme
} from '@material-ui/core'
import { ChevronLeft, ChevronRight, Edit, TrendingUp } from '@material-ui/icons'
import { PathToProdStepper } from 'Components/PathToProdStepper'
import { SonarqubeIndicator } from 'Components/SonarqubeIndicator'
import { SonarqubeTooltip } from 'Components/SonarqubeTooltip'
import { Tag } from 'Components/Tag'
import useSonarqubeRatings from 'Hooks/useSonarqubeRatings'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hasProjectAccess } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { selectProductById } from 'Redux/Products/selectors'
import { requestUpdateJourneyMapById } from 'Redux/Projects/actions'
import ProjectConstants from 'Redux/Projects/constants'
import { selectProjectById } from 'Redux/Projects/selectors'

const useStyles = makeStyles(theme => ({
    card: {
        width: '450px',
        height: '100%',
        backgroundColor: theme.palette.grey[1100]
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        },
        width: 'fit-content'
    }
}))

function ProjectCard({ id }) {
    const dispatch = useDispatch()
    const theme = useTheme()
    const classes = useStyles()
    const history = useHistory()

    const sonarqube = useSonarqubeRatings()

    const project = useSelector(state => selectProjectById(state, id))
    const product = useSelector(state => selectProductById(state, project.productId))
    const hasAccess = useSelector(state => hasProjectAccess(state, project.id))
    const coverage = project.coverage ?? {}

    const calcStep = () => Math.log2(project.projectJourneyMap + 1)

    const handleProgress = (increment) => {
        const step = calcStep() + increment
        const journey = Math.pow(2, step) - 1

        dispatch(requestUpdateJourneyMapById({
            id,
            projectJourneyMap: journey
        }))
    }

    const updateProjectPopup = () => {
        dispatch(openPopup(ProjectConstants.UPDATE_PROJECT, 'ProjectPopup', { id }))
    }

    const goToProductsPage = () => history.push(`/products/${project.productId}/overview`)

    return (
        <Card className = {classes.card}>
            <CardHeader
                title = {project.name}
                subheader = {product.name}
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'textPrimary',
                    'data-testid': 'ProjectCard__header-title',
                }}
                subheaderTypographyProps = {{
                    'data-testid': 'ProjectCard__header-subheader',
                    onClick: project.productId !== null ? goToProductsPage : undefined,
                    className: project.productId !== null ? classes.link : 'card',
                }}
                action = {hasAccess &&
                    <IconButton
                        onClick = {updateProjectPopup}
                        color = 'secondary'
                        data-testid = 'ProjectCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            <Box display = 'flex'>
                {hasAccess &&
                    <Tooltip title = 'Roll back status'>
                        <>
                            <IconButton
                                onClick = {() => handleProgress(-1)}
                                color = 'secondary'
                                data-testid = 'ProjectCard__button-back'
                                disabled = {project.projectJourneyMap === 0}
                                style = {{ height: '48px', margin: 'auto' }}
                                disableRipple
                            >
                                <ChevronLeft />
                            </IconButton>
                        </>
                    </Tooltip>
                }
                <PathToProdStepper step = {calcStep()} />
                {hasAccess &&
                    <Tooltip title = 'Complete current step'>
                        <>
                            <IconButton
                                onClick = {() => handleProgress(1)}
                                color = 'secondary'
                                data-testid = 'ProjectCard__button-forward'
                                disabled = {project.projectJourneyMap === 7}
                                style = {{ height: '48px', margin: 'auto' }}
                                disableRipple
                            >
                                <ChevronRight />
                            </IconButton>
                        </>
                    </Tooltip>
                }
            </Box>
            <CardContent>
                <Box display = 'flex' justifyContent = 'space-between' padding = {1}>
                    <SonarqubeIndicator
                        title = 'Coverage'
                        value = {coverage.testCoverage ?? '?'}
                        adornment = { coverage.coverageChange !== 0 &&
                            coverage.coverageChange !== undefined &&
                            <TrendingUp
                                fontSize = 'small'
                                style = {{
                                    margin: 'auto',
                                    transform: coverage.coverageChange < 0 ? 'scaleY(-1)' : 'unset',
                                    color: coverage.coverageChange < 0 ? theme.palette.error.main :
                                        theme.palette.success.main
                                }}
                            />
                        }
                        tooltip = {
                            <SonarqubeTooltip
                                message = {`Code coverage is currently at ${coverage.testCoverage}%`}
                                pipelineUrl = {coverage.pipelineUrl}
                                sonarqubeUrl = {coverage.sonarqubeUrl}
                            />
                        }
                    />
                    <SonarqubeIndicator
                        title = 'Security'
                        value = {coverage.securityRating ?? '?'}
                        tooltip = {
                            <SonarqubeTooltip
                                message = {sonarqube.security[coverage.securityRating]?.description}
                                pipelineUrl = {coverage.pipelineUrl}
                                sonarqubeUrl = {coverage.sonarqubeUrl}
                            />
                        }
                    />
                    <SonarqubeIndicator
                        title = 'Reliability'
                        value = {coverage.reliabilityRating ?? '?'}
                        tooltip = {
                            <SonarqubeTooltip
                                message = {sonarqube.reliability[coverage.reliabilityRating]?.description}
                                pipelineUrl = {coverage.pipelineUrl}
                                sonarqubeUrl = {coverage.sonarqubeUrl}
                            />
                        }
                    />
                    <SonarqubeIndicator
                        title = 'Maintainability'
                        value = {coverage.maintainabilityRating ?? '?'}
                        tooltip = {
                            <SonarqubeTooltip
                                message = {sonarqube.maintainability[coverage.maintainabilityRating]?.description}
                                pipelineUrl = {coverage.pipelineUrl}
                                sonarqubeUrl = {coverage.sonarqubeUrl}
                            />
                        }
                    />
                </Box>
                {project.tags?.length > 0 &&
                    <Box display = 'flex' flexWrap = 'wrap' marginTop = {2}>
                        {project.tags.map((tag, index) => (
                            <Tag { ...tag } key = {index}/>
                        ))}
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

ProjectCard.propTypes = {
    id: PropTypes.number.isRequired,
}

export default ProjectCard