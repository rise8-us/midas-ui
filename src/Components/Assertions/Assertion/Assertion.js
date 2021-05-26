import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAssertionRoot from '../../../Hooks/useAssertionRoot'
import useDebounce from '../../../Hooks/useDebounce'
import { requestDeleteAssertion, requestUpdateAssertion } from '../../../Redux/Assertions/actions'
import { selectAssertionById, selectAssertionsByParentId } from '../../../Redux/Assertions/selectors'
import { modifyAssertion } from '../../../Redux/ModifiedAssertions/reducer'
import { AddAnotherAssertion } from '../AddAnotherAssertion'
import { AssertionAccordion } from '../AssertionAccordion'

const Assertion = React.memo(({ id, create, defaultText, parentIndex, index, order,
    defaultEditable, defaultExpanded, productId, outerRoot, outerRootButtonProps }) => {

    const dispatch = useDispatch()
    const subOrder = [...order]
    const type = subOrder.shift() ?? ''
    const child = subOrder[0]?.toLowerCase()

    const identifier = `${type}_${index}`
    const linkKey = parentIndex !== null ? `${parentIndex}-${identifier}` : identifier
    const category = type[0] + type.substring(1).toLowerCase()

    const assertionDetails = {
        linkKey,
        identifier,
        type,
    }

    const defaultAssertion = {
        ...assertionDetails,
        text: defaultText,
        status: 'NOT_STARTED'
    }

    const assertionLookup = useSelector(state => selectAssertionById(state, id))

    const childAssertions = useSelector(state => selectAssertionsByParentId(state, id))
    const newAssertion = create || typeof assertionLookup?.id !== 'number'

    const currentAssertion = newAssertion ? defaultAssertion : { ...assertionLookup, ...assertionDetails }

    const [childAssertionsLength, setChildAssertionLength] = useState(childAssertions.length)
    const [kids, setKids] = useState(newAssertion ? [defaultAssertion] : childAssertions)
    const [text, setText] = useState(currentAssertion.text)
    const [changeable, setChangeable] = useState(false)

    const textDebounce = useDebounce(text, 500)
    const buildTree = useAssertionRoot(currentAssertion.linkKey)

    const addKid = () => {
        const newKid = {
            parentId: currentAssertion.id,
            type: child,
            parentIndex: linkKey,
            status: 'NOT_STARTED'
        }
        const newKidsOnTheBlock = [...kids, { ...newKid }]
        setKids(newKidsOnTheBlock)
    }

    const onSaveClick = () => {
        setKids(childAssertions)
        dispatch(requestUpdateAssertion(buildTree)).then(unwrapResult).then(setChangeable(false))
    }

    const onDeleteClick = () => {
        dispatch(requestDeleteAssertion(id))
    }

    useEffect(() => {
        const updatedEntry = {
            text: textDebounce,
            id: currentAssertion.id,
            parentKey: parentIndex,
            status: currentAssertion.status,
            productId,
            linkKey,
            identifier,
            type
        }
        dispatch(modifyAssertion(updatedEntry))
    }, [textDebounce])

    useEffect(() => {
        if (childAssertions.length !== childAssertionsLength) {
            setKids(childAssertions)
            setChildAssertionLength(childAssertions.length)
        }
    }, [childAssertions])

    return (
        <AssertionAccordion
            accordionHeaderProps = {{
                id: currentAssertion.id,
                commentCount: assertionLookup?.commentIds?.length,
                category,
                detail: text,
                editable: !create,
                defaultEditable,
                onChange: setText,
                status: assertionLookup?.status,
                onSave: id > 1 ? onSaveClick : undefined,
                onDelete: id > 1 ? onDeleteClick : undefined,
                onEditClick: setChangeable,
                exitEditOnSave: true
            }}
            outerRootButtonProps = {outerRootButtonProps}
            defaultExpanded = {defaultExpanded}
            expanded = {child ? undefined : false}
            outerRoot = {outerRoot}
            create = {create}
        >
            <>
                {kids.map((kid, key) => {
                    const creation = create || kid.id === undefined
                    return (
                        <Assertion
                            key = {key}
                            defaultText = {`Enter new ${child} here...`}
                            index = {key}
                            order = {subOrder}
                            id = {kid.id}
                            productId = {productId}
                            parentIndex = {linkKey}
                            create = {creation}
                            defaultExpanded = {defaultExpanded}
                            defaultEditable = {creation}
                            editable = {!creation}
                            outerRoot = {false}
                        />
                    )
                })}
                {child && (changeable || create) &&
                    <AddAnotherAssertion label = {child} onClick = {addKid} />
                }
            </>
        </AssertionAccordion>
    )
})

Assertion.propTypes = {
    defaultText: PropTypes.string,
    index: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number,
    parentIndex: PropTypes.string,
    create: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    defaultEditable: PropTypes.bool,
    outerRoot: PropTypes.bool,
    outerRootButtonProps: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func
    }),
}

Assertion.defaultProps = {
    id: null,
    create: false,
    parentIndex: null,
    defaultExpanded: false,
    defaultEditable: false,
    defaultText: undefined,
    outerRoot: true,
    outerRootButtonProps: {
        label: 'add objective',
        onClick: undefined
    },
}

export default Assertion