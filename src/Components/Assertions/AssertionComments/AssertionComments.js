import { Paper } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AssertionStatusDropdown } from '../'
import useWindowSize from '../../../Hooks/useWindowSize'
import { setAssertionComment } from '../../../Redux/AppSettings/reducer'
import { requestUpdateAssertion } from '../../../Redux/Assertions/actions'
import { requestCreateComment } from '../../../Redux/Comments/actions'
import { AddComment, CommentsList } from '../../Comments/'

function AssertionComments({ assertionId }) {
    const ref = useRef()
    const browserSize = useWindowSize()
    const scroll = useSelector(state => state.app.pageScrollY)
    const dispatch = useDispatch()

    const maxHeight = browserSize.height - 88 - 33

    const assertion = useSelector(state => state.assertions[assertionId])

    const selectedStatus = useSelector(state => state.app.assertionStatus[assertion?.status ?? 'NOT_STARTED'])
    const [status, setStatus] = useState(selectedStatus?.name ?? 'NOT_STARTED')

    const handleSubmit = (value) => {
        dispatch(requestCreateComment({
            assertionId,
            text: `${value}###${status}`
        })).then(unwrapResult).then(() => {
            dispatch(requestUpdateAssertion({
                id: assertionId,
                text: assertion.text,
                children: [],
                status: status
            }))
        })
    }

    if (assertion === undefined) {
        dispatch(setAssertionComment(null))
        return null
    }

    useLayoutEffect(() => {
        const offsetTop = ref.current?.offsetTop - 88
        if (offsetTop > scroll) ref.current.style.height = `${maxHeight - offsetTop + scroll}px`
        else ref.current.style.height = `${maxHeight}px`
    }, [scroll])

    useEffect(() => {
        selectedStatus && setStatus(selectedStatus.name)
    }, [selectedStatus])

    return (
        <Paper
            ref = {ref}
            style = {{
                top: '2px',
                position: 'sticky',
                maxHeight: `${maxHeight}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            data-testid = 'AssertionComment__paper'
        >
            <CommentsList
                commentProps = {{ handleStatusUpdates: true }}
                commentIds = {assertion.commentIds}
            />
            <AddComment
                assertionId = {assertionId}
                additionalNode = {
                    <AssertionStatusDropdown
                        option = {selectedStatus}
                        onChange = {setStatus}
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