import { makeStyles } from '@material-ui/core/styles'
import objectHash from 'object-hash'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from '../../../Redux/AppSettings/reducer'
import { requestSearchAssertions } from '../../../Redux/Assertions/actions'
import { selectAssertionsByTypeAndProductId } from '../../../Redux/Assertions/selectors'
import { Assertion, AssertionComments, CreateAssertionsButton } from '../../Assertions'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    assertion: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    comments: {
        marginTop: 72,
        marginLeft: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    }
}))

function AssertionsTab({ productId }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const bottomOfAssertionsRef = useRef(null)

    const showComments = useSelector(state => state.app.assertionCommentsOpen)
    const objectives = useSelector(state => selectAssertionsByTypeAndProductId(state, 'objective', productId),
        (left, right) => objectHash(left) === objectHash(right))

    useEffect(() => {
        dispatch(requestSearchAssertions(`product.id:${productId}`))
        dispatch(setAssertionComment(null))
    }, [])

    return (
        <div className = {classes.root}>
            <div style = {{ width: showComments ? 'calc(100% - 350px)' : '100%' }} className = {classes.assertion}>
                <CreateAssertionsButton productId = {productId} ref = { bottomOfAssertionsRef } />
                {objectives.map((objective, index) => (
                    <div style = {{ margin: '16px 0' }} key = { objective.id}>
                        <Assertion
                            index = {index + 1}
                            order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                            id = {objective.id}
                            productId = {productId}
                            defaultExpanded
                        />
                    </div>
                ))}
                <div ref = {bottomOfAssertionsRef}></div>
            </div>
            { showComments &&
                <div className = {classes.comments} style = {{ width: '350px' }}>
                    <AssertionComments assertionId = {showComments}/>
                </div>
            }
        </div>
    )
}

AssertionsTab.propTypes = {
    productId: PropTypes.number.isRequired
}

export default AssertionsTab
