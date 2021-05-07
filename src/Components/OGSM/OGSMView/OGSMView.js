import { Accordion, AccordionActions, AccordionDetails, Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddAnotherAssertion, OGSMGoal, OGSMHeader } from '../'
import useDebounce from '../../../Hooks/useDebounce'
import { requestFetchAssertions } from '../../../Redux/Assertions/actions'
import { requestCreateObjective } from '../../../Redux/Objectives/actions'
import {
    addNewAssertion, deleteNewObjective, updateNewAssertion, updateNewObjective
} from '../../../Redux/Objectives/reducer'
import { selectObjectiveById } from '../../../Redux/Objectives/selectors'

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

function OGSMView({ id, create, productId }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const defaultText = 'Enter goal here...'
    const creationGoal = {
        linkKey: 'goal_1',
        identifier: 'goal_1',
        type: 'GOAL',
        text: defaultText
    }

    const objective = useSelector(state => selectObjectiveById(state, id))

    const [objectiveText, setObjectiveText] = useState(create ? 'Enter objective here...' : objective.text)
    const [goals, setGoals] = useState(create ? [creationGoal] : [])
    const [changeable, setChangeable] = useState(false)

    const creationObjective = useSelector(state => state.objectives.creation)

    const objectiveTextDebounce = useDebounce(objectiveText, 500)

    const onAddGoal = () => {
        const newGoals = [...goals]
        const newGoal = {
            text: defaultText,
            type: 'GOAL',
            linkKey: `goal_${newGoals.length + 1}`,
            identifier: `goal_${newGoals.length + 1}`
        }
        newGoals.push(newGoal)
        setGoals(newGoals)
        dispatch(addNewAssertion(newGoal))
    }

    const onGoalChange = (newText, idx) => {
        let newGoals = [...goals]
        newGoals[idx] = {
            ...newGoals[idx],
            text: newText
        }
        dispatch(updateNewAssertion(newGoals[idx]))
        setGoals(newGoals)
    }


    //TODO
    const sendIt = async() => {
        const payload = {
            ...creationObjective,
            assertionDTOs: Object.values(creationObjective.assertionDTOs)
        }
        const response = await dispatch(requestCreateObjective(payload))

        if (response.meta.requestStatus === 'fulfilled') dispatch(deleteNewObjective())
    }

    useEffect(() => {
        create && dispatch(updateNewObjective({
            text: objectiveTextDebounce,
            productId,
        }))
    }, [objectiveTextDebounce])

    useEffect(() => {
        const getAssertions = async() => {
            const response = await dispatch(requestFetchAssertions(`objective.id:${id}`))
            const goals = response.payload.filter(a => a.type === 'GOAL')
            setGoals(goals)
        }
        !create && getAssertions()
        create && dispatch(addNewAssertion(creationGoal))
    }, [])

    return (
        <div className = {classes.root}>
            <Accordion
                TransitionProps = {{ unmountOnExit: true }}
                className = {classes.outerAccordion}
                defaultExpanded = {create}
            >
                <OGSMHeader
                    category = 'Objective'
                    detail = {objectiveText}
                    onChange = {(val) => setObjectiveText(val)}
                    autoFocus = {true}
                    editable = {false} //{!create}
                    defaultEditable = {create}
                    onEditClick = {setChangeable}
                />
                <AccordionDetails className = {classes.accordionDetails} style = {{ marginBottom: '16px' }}>
                    { goals.map((goal, index) => {
                        const creation = create || goal.linkKey !== undefined
                        return (
                            <OGSMGoal
                                id = {goal.id}
                                text = {goal.text}
                                identifier = {goal.identifier}
                                onChange = {(value) => onGoalChange(value, index)}
                                key = {index}
                                create = {creation}
                                defaultExpanded = {creation}
                                defaultEditable = {creation}
                                editable = {!creation}
                            />
                        )
                    })}
                    {(changeable || create) && <AddAnotherAssertion label = 'goal' onClick = {onAddGoal} />}
                </AccordionDetails>
                {create &&
                    <AccordionActions style = {{ justifyContent: 'end' }}>
                        <Button
                            size = 'small'
                            color = 'primary'
                            variant = 'outlined'
                            onClick = {sendIt}
                        >Add OGSM</Button>
                    </AccordionActions>
                }
            </Accordion>
        </div>
    )
}

OGSMView.propTypes = {
    id: PropTypes.number,
    productId: PropTypes.number.isRequired,
    create: PropTypes.bool
}

OGSMView.defaultProps = {
    id: null,
    create: false
}

export default OGSMView