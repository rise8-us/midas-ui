import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    requestCreateAssertion,
    requestDeleteAssertion,
    requestUpdateAssertion
} from 'Redux/Assertions/actions'
import { selectAssertionById, selectAssertionsByParentId } from 'Redux/Assertions/selectors'
import { hasProductAccess } from 'Redux/Auth/selectors'
import { AssertionAccordion } from '../AssertionAccordion'

const Assertion = ({ id, order, defaultExpanded, productId }) => {

    const dispatch = useDispatch()
    const subOrder = [...order]
    const type = subOrder.shift()
    const childType = subOrder[0]?.toLowerCase()
    const category = type[0] + type.substring(1).toLowerCase()

    const assertion = useSelector(state => selectAssertionById(state, id))
    const childAssertions = useSelector(state => selectAssertionsByParentId(state, id))
    const hasAccess = useSelector(state =>  hasProductAccess(state, productId))

    const createChildAssertion = () => {
        const newChild = {
            text: `Enter new ${childType} here...`,
            type: childType.toUpperCase(),
            productId: productId,
            parentId: assertion.id,
            status: 'NOT_STARTED',
            children: []
        }
        dispatch(requestCreateAssertion(newChild))
    }

    const updateAssertion = (value) => {
        if (assertion.text !== value) {
            const updatedAssertion = {
                ...assertion,
                text: value,
                children: []
            }
            dispatch(requestUpdateAssertion(updatedAssertion))
        }
    }

    const onDeleteClick = () => {
        dispatch(requestDeleteAssertion(id))
    }

    return (
        <AssertionAccordion
            assertionHeaderProps = {{
                id: assertion.id,
                commentCount: assertion.commentIds?.length,
                title: assertion.text,
                status: assertion.status,
                hasAccess: hasAccess,
                onSave: updateAssertion,
                onDelete: onDeleteClick,
                addChildAssertion: childType ? createChildAssertion : undefined,
                addChildAssertionLabel: childType ? `add new ${childType}` : undefined,
            }}
            category = {category}
            expandable = {childAssertions.length > 0}
            defaultExpanded = {defaultExpanded}
            expanded = {childType ? undefined : false}
            rootAssertion = {type === 'OBJECTIVE'}
        >
            {childAssertions.map((child, key) => {
                return (
                    <Assertion
                        key = {`${productId}-${child.id}-${key}`}
                        index = {key}
                        order = {subOrder}
                        id = {child.id}
                        productId = {productId}
                        defaultExpanded = {defaultExpanded}
                    />
                )
            })}
        </AssertionAccordion>
    )
}

Assertion.propTypes = {
    productId: PropTypes.number.isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number,
    defaultExpanded: PropTypes.bool,
}

Assertion.defaultProps = {
    id: null,
    parentId: undefined,
    defaultExpanded: false,
}

export default React.memo(Assertion)