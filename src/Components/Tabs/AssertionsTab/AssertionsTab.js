import { Grid } from '@mui/material'
import { Assertion, AssertionComments, AssertionHeader, AssertionRootIdentifier } from 'Components/Assertions'
import objectHash from 'object-hash'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestSearchAssertions } from 'Redux/Assertions/actions'
import { selectAssertionsByTypeAndProductId, selectRootAssertionId } from 'Redux/Assertions/selectors'

function AssertionsTab({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const { assertionId } = useParams()
    const assertionIdParsed = parseInt(assertionId)

    const rootAssertionId = useSelector(state => selectRootAssertionId(state, assertionIdParsed))

    const showComments = useSelector(state => state.app.assertionCommentsOpen)
    const objectives = useSelector(state => selectAssertionsByTypeAndProductId(state, 'objective', productId),
        (left, right) => objectHash(left) === objectHash(right))

    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        dispatch(requestSearchAssertions(`product.id:${productId}`))
        dispatch(setAssertionComment({ assertionId: null, deletedAssertionId: null }))
    }, [])

    useEffect(() => {
        if (typeof rootAssertionId === 'number') {
            const newIndex = objectives.findIndex(o => o.id === rootAssertionId)
            setSelectedIndex(newIndex !== -1 ? newIndex : 0)

        }
    }, [rootAssertionId])

    return (
        <Grid container wrap = 'nowrap'>
            <Grid container item direction = 'column' spacing = {1}>
                <Grid item>
                    <AssertionHeader
                        productId = {productId}
                        hasEdit = {hasEdit}
                        onCreate = {() => setSelectedIndex(objectives.length)}
                    />
                </Grid>
                <Grid container item spacing = {2} style = {{ marginTop: '16px' }}>
                    {objectives.map((_objective, index) => (
                        <Grid item key = {index}>
                            <AssertionRootIdentifier
                                id = {index + 1}
                                title = {objectives[index].text}
                                selected = {index === selectedIndex}
                                onClick = {() => setSelectedIndex(index)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid item>
                    {objectives[selectedIndex] !== undefined &&
                        <Assertion
                            index = {selectedIndex + 1}
                            order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                            id = {objectives[selectedIndex].id}
                            productId = {productId}
                            hasEdit = {hasEdit}
                            defaultExpanded
                        />
                    }
                </Grid>
            </Grid>
            { showComments &&
            <Grid item style = {{ maxWidth: '350px', minWidth: '350px' }}>
                <AssertionComments assertionId = {showComments}/>
            </Grid>
            }
        </Grid>
    )
}

AssertionsTab.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default AssertionsTab
