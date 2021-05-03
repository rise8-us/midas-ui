import { Accordion, AccordionDetails, Button, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { OGSMHeader } from '../OGSMHeader'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px 0'
    },
    heading: {
        margin: 'auto 0'
    },
    outerAccordion: {
        margin: '16px 0'
    },
    innerAccordion: {
        width: '100%',
        boxShadow: 'none'
    },
    accordionDetails: {
        borderLeft: 'solid 1px',
        borderColor: theme.palette.text.secondary,
        marginLeft: theme.spacing(2),
        paddingRight: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'baseline'
    },
    accordionRoot: {
        '&:before': {
            display: 'none',
        }
    }
}))

function OGSMCreate({ productId }) {
    const classes = useStyles()

    const [objective, setObjective] = useState('')
    const [goals, setGoals] = useState([''])
    const [strategies, setStrategies] = useState([''])
    // const [goals, setGoals] = useState([''])

    const accordionInnerProps = {
        className: classes.innerAccordion,
        classes: {
            root: classes.accordionRoot
        },
        TransitionProps: {
            unmountOnExit: true
        }
    }

    const addGoal = () => {
        const newGoals = [...goals]
        newGoals.push('Enter new goal here...')
        setGoals(newGoals)
    }

    const onGoalChange = (newGoal, idx) => {
        let newGoals = [...goals]
        newGoals[idx] = newGoal
        setGoals(newGoals)
    }

    const addStrategy = () => {
        const newStrategies = [...strategies]
        newStrategies.push('Enter new strategy here...')
        setStrategies(newStrategies)
    }

    const onStrategyChange = (newStrategy, idx) => {
        let newStrategies = [...strategies]
        newStrategies[idx] = newStrategy
        setStrategies(newStrategies)
    }

    return (
        <div className = {classes.root}>
            <Typography
                className = {classes.heading}
                variant = 'h6'
                color = 'textSecondary'
                style = {{
                    display: 'none'
                }}
            >
                Create OGSM for product: {productId}
            </Typography>
            <Accordion TransitionProps = {{ unmountOnExit: true }} className = {classes.outerAccordion} defaultExpanded>
                <OGSMHeader
                    category = 'Objective'
                    detail = {objective}
                    onChange = {(val) => setObjective(val)}
                    autoFocus = {true}
                />
                { objective.length > 0 &&
                    <AccordionDetails className = {classes.accordionDetails} style = {{ marginBottom: '16px' }}>
                        { goals.map((goal, index) => (
                            <Accordion {...accordionInnerProps} key = {index}>
                                <OGSMHeader
                                    category = 'Goal'
                                    detail = {goal}
                                    onChange = {(val) => onGoalChange(val, index)}
                                />
                                <AccordionDetails className = {classes.accordionDetails}>
                                    { strategies.map((goal, index1) => (
                                        <Accordion {...accordionInnerProps} key = {index1}>
                                            <OGSMHeader
                                                category = 'Strategy'
                                                detail = {goal}
                                                onChange = {(val) => onStrategyChange(val, index1)}
                                            />
                                        </Accordion>
                                    ))}
                                    { strategies[0].length > 0 &&
                                        <Button
                                            style = {{ margin: '8px' }}
                                            variant = 'text'
                                            color = 'primary'
                                            onClick = {addStrategy}
                                        >
                                            Add another strategy...
                                        </Button>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        { goals[0].length > 0 &&
                            <Button
                                style = {{ margin: '8px' }}
                                variant = 'text'
                                color = 'primary'
                                onClick = {addGoal}
                            >
                                Add another goal...
                            </Button>
                        }
                    </AccordionDetails>
                }
            </Accordion>
        </div>
    )
}

OGSMCreate.propTypes = {
    productId: PropTypes.number.isRequired,
}

export default OGSMCreate