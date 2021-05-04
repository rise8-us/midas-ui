import { Accordion, AccordionActions, AccordionDetails, Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { OGSMHeader } from '../OGSMHeader'
import { OGSMMeasure } from '../OGSMMeasure'

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

function OGSMCreate() {
    const classes = useStyles()

    const [objective, setObjective] = useState('Enter objective here...')
    const [goals, setGoals] = useState(['Enter goal here...'])
    const [strategies, setStrategies] = useState(['Enter strategy here...'])
    const [measures, setMeasures] = useState(['Enter measurement here...'])

    const accordionInnerProps = {
        className: classes.innerAccordion,
        defaultExpanded: true,
        classes: {
            root: classes.accordionRoot
        },
        TransitionProps: {
            unmountOnExit: true
        }
    }

    const addGoal = () => {
        const newGoals = [...goals]
        newGoals.push('Enter another goal here...')
        setGoals(newGoals)
    }

    const onGoalChange = (newGoal, idx) => {
        let newGoals = [...goals]
        newGoals[idx] = newGoal
        setGoals(newGoals)
    }

    const addStrategy = () => {
        const newStrategies = [...strategies]
        newStrategies.push('Enter another strategy here...')
        setStrategies(newStrategies)
    }

    const onStrategyChange = (newStrategy, idx) => {
        let newStrategies = [...strategies]
        newStrategies[idx] = newStrategy
        setStrategies(newStrategies)
    }

    const addMeasure = () => {
        const newMeasures = [...measures]
        newMeasures.push('Enter another measure here...')
        setMeasures(newMeasures)
    }

    const onMeasureChange = (newMeasure, idx) => {
        let newMeasures = [...measures]
        newMeasures[idx] = newMeasure
        setMeasures(newMeasures)
    }

    return (
        <div className = {classes.root}>
            <Accordion TransitionProps = {{ unmountOnExit: true }} className = {classes.outerAccordion} defaultExpanded>
                <OGSMHeader
                    category = 'Objective'
                    detail = {objective}
                    onChange = {(val) => setObjective(val)}
                    autoFocus = {true}
                />
                <AccordionDetails className = {classes.accordionDetails} style = {{ marginBottom: '16px' }}>
                    { goals.map((goal, x) => (
                        <Accordion {...accordionInnerProps} key = {x}>
                            <OGSMHeader
                                category = 'Goal'
                                detail = {goal}
                                onChange = {(val) => onGoalChange(val, x)}
                            />
                            <AccordionDetails className = {classes.accordionDetails}>
                                { strategies.map((goal, y) => (
                                    <Accordion {...accordionInnerProps} key = {y}>
                                        <OGSMHeader
                                            category = 'Strategy'
                                            detail = {goal}
                                            onChange = {(val) => onStrategyChange(val, y)}
                                        />
                                        <AccordionDetails className = {classes.accordionDetails}>
                                            {measures.map((measure, z) => (
                                                <OGSMMeasure
                                                    detail = {measure}
                                                    onChange = {onMeasureChange}
                                                    key = {z}
                                                />
                                            ))}
                                            <Button
                                                style = {{ margin: '8px' }}
                                                variant = 'text'
                                                color = 'primary'
                                                onClick = {addMeasure}
                                            >Add another measurement...</Button>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                                <Button
                                    style = {{ margin: '8px' }}
                                    variant = 'text'
                                    color = 'primary'
                                    onClick = {addStrategy}
                                >Add another strategy...</Button>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <Button
                        style = {{ margin: '8px' }}
                        variant = 'text'
                        color = 'primary'
                        onClick = {addGoal}
                    >Add another goal...</Button>
                </AccordionDetails>
                <AccordionActions style = {{ justifyContent: 'end' }}>
                    <Button size = 'small' color = 'primary' variant = 'outlined'>Add OGSM</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

export default OGSMCreate