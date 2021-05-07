import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AssertionAccordion, OGSMStrategy } from '../'
import { selectAssertionsByParentId } from '../../../Redux/Assertions/selectors'
import { addNewAssertion, updateNewAssertion } from '../../../Redux/Objectives/reducer'
function OGSMGoal({ id, text, defaultExpanded, defaultEditable, create, onChange, identifier }) {
    const dispatch = useDispatch()

    const defaultText = 'Enter strategy here...'
    const creationStrategy = {
        identifier: `${identifier}-strategy_1`,
        type: 'STRATEGY',
        linkKey: identifier,
        text: defaultText
    }

    const childAssertions = useSelector(state => selectAssertionsByParentId(state, id))

    const [strategies, setStrategies] = useState(create ? [creationStrategy] : childAssertions)
    const [changeable, setChangeable] = useState(false)

    const onAddStrategy = () => {
        const newStrategies = [...strategies]
        const newStrategy = {
            text: defaultText,
            identifier: `${identifier}-strategy_${newStrategies.length + 1}`,
            linkKey: identifier
        }
        newStrategies.push(newStrategy)
        setStrategies(newStrategies)
        dispatch(addNewAssertion(newStrategy))
    }

    const onStrategyChange = (newText, idx) => {
        let newStrategies = [...strategies]
        newStrategies[idx] = {
            ...newStrategies[idx],
            text: newText
        }
        setStrategies(newStrategies)
        dispatch(updateNewAssertion(newStrategies[idx]))
    }

    const onSaveClick = () => {
        //TODO: ADD dispatch for saving
    }

    useEffect(() => {
        create && dispatch(addNewAssertion(creationStrategy))
    }, [])

    return (
        <AssertionAccordion
            accordionHeaderProps = {{
                category: 'Goal',
                detail: text,
                editable: false, //!create,
                defaultEditable,
                onChange: onChange,
                onSave: id > 1 ? onSaveClick : undefined,
                onEditClick: setChangeable
            }}
            addAnotherButtonProps = {{
                label: 'strategy',
                onClick: onAddStrategy
            }}
            canAddOption = {changeable || create}
            defaultExpanded = {defaultExpanded}
        >
            {strategies.map((strategy, index) => {
                const creation = create || strategy.linkKey !== undefined
                return (
                    <OGSMStrategy
                        id = {strategy.id}
                        text = {strategy.text}
                        identifier = {strategy.identifier}
                        onChange = {(value) => onStrategyChange(value, index)}
                        key = {index}
                        create = {creation}
                        defaultExpanded = {creation}
                        defaultEditable = {creation}
                        editable = {!creation}
                    />
                )
            })}
        </AssertionAccordion>
    )
}

OGSMGoal.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultExpanded: PropTypes.bool,
    create: PropTypes.bool,
    defaultEditable: PropTypes.bool,
    identifier: PropTypes.string
}

OGSMGoal.defaultProps = {
    id: -1,
    identifier: undefined,
    defaultExpanded: false,
    defaultEditable: false,
    create: false,
}

export default OGSMGoal