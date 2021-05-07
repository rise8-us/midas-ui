import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AssertionAccordion, OGSMMeasure } from '../'
import { selectAssertionsByParentId } from '../../../Redux/Assertions/selectors'
import { addNewAssertion, updateNewAssertion } from '../../../Redux/Objectives/reducer'

function OGSMStrategy({ id, text, defaultExpanded, defaultEditable, create, onChange, identifier }) {
    const dispatch = useDispatch()

    const defaultText = 'Enter measure here...'
    const creationMeasure = {
        identifier: `${identifier}-measure_1`,
        type: 'MEASURE',
        linkKey: identifier,
        text: defaultText
    }

    const childAssertions = useSelector(state => selectAssertionsByParentId(state, id))

    const [measures, setMeasures] = useState(create ? [creationMeasure] : childAssertions)
    const [changable, setChangable] = useState(false)

    const onAddMeasure = () => {
        const newMeasures = [...measures]
        const newMeasure = {
            id: 0,
            text: defaultText,
            identifier: `${identifier}-measure_${measures.length + 1}`,
            linkKey: identifier
        }
        newMeasures.push(newMeasure)
        setMeasures(newMeasures)
        dispatch(addNewAssertion(newMeasure))
    }

    const onMeasureChange = (newText, idx) => {
        let newMeasures = [...measures]
        newMeasures[idx] = {
            ...newMeasures[idx],
            text: newText
        }
        setMeasures(newMeasures)
        dispatch(updateNewAssertion(newMeasures[idx]))
    }

    const onSaveClick = () => {
        //TODO: ADD dispatch for saving
    }

    useEffect(() => {
        create && dispatch(addNewAssertion(creationMeasure))
    }, [])

    return (
        <AssertionAccordion
            accordionHeaderProps = {{
                category: 'Strategy',
                detail: text,
                editable: false, //!create,
                defaultEditable,
                onChange: onChange,
                onSave: id > 1 ? onSaveClick : undefined,
                onEditClick: setChangable,
            }}
            addAnotherButtonProps = {{
                label: 'measure',
                onClick: onAddMeasure
            }}
            canAddOption = {changable || create}
            defaultExpanded = {defaultExpanded}
        >
            {measures.map((measure, index) => (
                <OGSMMeasure
                    detail = {measure.text}
                    onChange = {(value) => onMeasureChange(value, index)}
                    readOnly = {!changable && !create}
                    key = {index}
                />
            ))}
        </AssertionAccordion>
    )
}

OGSMStrategy.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultExpanded: PropTypes.bool,
    create: PropTypes.bool,
    defaultEditable: PropTypes.bool,
    identifier: PropTypes.string
}

OGSMStrategy.defaultProps = {
    id: -1,
    defaultExpanded: false,
    defaultEditable: false,
    create: false,
    identifier: undefined
}

export default OGSMStrategy