import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../Hooks/useDebounce'
import {
    requestCreateAssertion,
    requestDeleteAssertion,
    requestUpdateAssertion
} from '../../../Redux/Assertions/actions'
import { selectAssertionById, selectAssertionsByParentId } from '../../../Redux/Assertions/selectors'
import { modifyAssertion } from '../../../Redux/ModifiedAssertions/reducer'
import { AssertionAccordion } from '../AssertionAccordion'

const Assertion = React.memo(({ id, create, defaultText, parentIndex, index, order,
    defaultEditable, defaultExpanded, productId, actionButtons,
    assertionType, parentId, quickSave }) => {

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

    const textDebounce = useDebounce(text, 500)

    const addKid = () => {
        const newKid = {
            parentId: currentAssertion.id,
            type: child,
            parentIndex: linkKey,
            status: 'NOT_STARTED',
            productId: productId
        }
        const newKidsOnTheBlock = [...kids, { ...newKid }]
        setKids(newKidsOnTheBlock)
    }

    const onSaveClick = (value) => {
        if (currentAssertion.id === undefined) {
            const newAssertion = {
                text: value,
                parentId: parentId,
                status: 'NOT_STARTED',
                productId: productId,
                type: assertionType.toUpperCase(),
                children: []
            }
            dispatch(requestCreateAssertion(newAssertion))
        } else {
            const updatedAssertion = {
                ...currentAssertion,
                text: value
            }
            dispatch(requestUpdateAssertion(updatedAssertion))
        }
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
                onSave: onSaveClick,
                onDelete: id > 1 ? onDeleteClick : undefined,
                exitEditOnSave: true,
                addChildAssertion: child ? addKid : undefined,
                addChildAssertionLabel: child ? `add new ${child}` : undefined,
                expandable: (!newAssertion && childAssertions.length > 0),
                quickSave: quickSave
            }}
            actionButtons = {actionButtons}
            defaultExpanded = {defaultExpanded}
            expanded = {child ? undefined : false}
            rootAssertion = {type === 'OBJECTIVE'}
        >
            {kids.map((kid, key) => {
                const creation = create || kid.id === undefined
                return (
                    <Assertion
                        key = {`${productId}-${kid.id}-${key}`}
                        defaultText = {`Enter new ${child} here...`}
                        index = {key}
                        order = {subOrder}
                        assertionType = {kid.type}
                        parentId = {kid.parentId}
                        id = {kid.id}
                        productId = {productId}
                        parentIndex = {linkKey}
                        create = {creation}
                        defaultExpanded = {defaultExpanded}
                        defaultEditable = {creation}
                        editable = {!creation}
                        quickSave = {quickSave}
                    />
                )
            })}
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
    assertionType: PropTypes.string,
    parentId: PropTypes.number,
    quickSave: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    defaultEditable: PropTypes.bool,
    actionButtons: PropTypes.node
}

Assertion.defaultProps = {
    id: null,
    create: false,
    assertionType: undefined,
    parentId: undefined,
    parentIndex: null,
    defaultExpanded: false,
    defaultEditable: false,
    defaultText: undefined,
    quickSave: true,
    actionButtons: undefined
}

export default Assertion