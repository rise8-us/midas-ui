import { Grid } from '@material-ui/core'
import { Assertion, AssertionComments, AssertionHeader } from 'Components/Assertions'
import objectHash from 'object-hash'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestSearchAssertions } from 'Redux/Assertions/actions'
import { selectAssertionsByTypeAndProductId } from 'Redux/Assertions/selectors'
import { hasProductAccess } from 'Redux/Auth/selectors'

function AssertionsTab({ productId }) {
    const dispatch = useDispatch()
    const bottomOfAssertionsRef = useRef(null)

    const hasEdit = useSelector(state =>  hasProductAccess(state, productId))
    const showComments = useSelector(state => state.app.assertionCommentsOpen)
    const objectives = useSelector(state => selectAssertionsByTypeAndProductId(state, 'objective', productId),
        (left, right) => objectHash(left) === objectHash(right))

    useEffect(() => {
        dispatch(requestSearchAssertions(`product.id:${productId}`))
        dispatch(setAssertionComment({ assertionId: null, deletedAssertionId: null }))
    }, [])

    return (
        <Grid container wrap = 'nowrap' spacing = {1}>
            <Grid container item direction = 'column'>
                <Grid item>
                    <AssertionHeader productId = {productId} ref = {bottomOfAssertionsRef} hasEdit = {hasEdit}/>
                </Grid>
                {objectives.map((objective, index) => (
                    <Grid item key = {index} style = {{ marginLeft: '-8px' }}>
                        <Assertion
                            index = {index + 1}
                            order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                            id = {objective.id}
                            productId = {productId}
                            defaultExpanded
                        />
                    </Grid>
                ))}
                <Grid item>
                    <div ref = {bottomOfAssertionsRef}></div>
                </Grid>
            </Grid>
            { showComments &&
            <Grid item style = {{ maxWidth: '350px', minWidth: '350px' }}>
                <AssertionComments assertionId = {showComments} hasAccess = {hasEdit}/>
            </Grid>
            }
        </Grid>
    )
}

AssertionsTab.propTypes = {
    productId: PropTypes.number.isRequired
}

export default AssertionsTab
