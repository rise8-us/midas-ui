import { Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AssertionStatusDropdown } from '../'
import useScroll from '../../../Hooks/useScroll'
import useWindowSize from '../../../Hooks/useWindowSize'
import { requestCreateComment } from '../../../Redux/Comments/actions'
import { AddComment, CommentsList } from '../../Comments/'

function AssertionComments({ assertionId }) {
    const ref = useRef()
    const browserSize = useWindowSize()
    const scroll = useScroll()
    const dispatch = useDispatch()

    const maxHeight = browserSize.height - 88 - 56

    const assertion = useSelector(state => state.assertions[assertionId])

    const [selectedStatus, setSelectedStatus] = useState(assertion.status)

    const handleSubmit = (value) => {
        dispatch(requestCreateComment({
            assertionId,
            text: `${value}###${selectedStatus}`
        }))
    }

    useLayoutEffect(() => {
        const offsetTop = ref.current?.offsetTop - 80
        if (offsetTop > scroll) ref.current.style.height = `${maxHeight - offsetTop + scroll}px`
        else ref.current.style.height = `${maxHeight}px`
    }, [scroll])

    return (
        <Paper
            ref = {ref}
            style = {{
                top: '80px',
                position: 'sticky',
                maxHeight: `${maxHeight}px`,
                height: `${browserSize.height - 56 - ref.current?.offsetTop}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <CommentsList assertionId = {assertionId} commentProps = {{ handleStatusUpdates: true }}/>
            <AddComment
                assertionId = {assertionId}
                additionalNode = {
                    <AssertionStatusDropdown
                        option = {selectedStatus}
                        onChange = {setSelectedStatus}
                        error = {selectedStatus.length === 0}
                    />
                }
                onSubmit = {handleSubmit}
            />
        </Paper>
    )
}

AssertionComments.propTypes = {
    assertionId: PropTypes.number.isRequired
}

export default AssertionComments