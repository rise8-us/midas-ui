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

function AssertionComments({ assertionId, hasAccess }) {
    const ref = useRef()
    const browserSize = useWindowSize()
    const scroll = useSelector(state => state.app.pageScrollY)
    const dispatch = useDispatch()


    const assertion = useSelector(state => state.assertions[assertionId])

    const selectedStatus = useSelector(state => state.app.assertionStatus[assertion?.status ?? 'NOT_STARTED'])
    const [status, setStatus] = useState(selectedStatus?.name ?? 'NOT_STARTED')

    const [maxHeight, setMaxHeight] = useState((browserSize?.height ?? 0) - 88 - 33)
    const [height, setHeight] = useState(0)

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
        if (offsetTop > scroll) setHeight(maxHeight - offsetTop + scroll)
        else setHeight(maxHeight)
    }, [scroll, maxHeight])

    useEffect(() => {
        selectedStatus && setStatus(selectedStatus.name)
    }, [selectedStatus])

    useEffect(() => {
        setMaxHeight((browserSize?.height ?? 0) - 88 - 33)
    }, [browserSize])

    return (
        <Paper
            ref = {ref}
            style = {{
                top: '2px',
                position: 'sticky',
                height: `${height}px`,
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
                        hasAccess = {hasAccess}
                    />
                }
                onSubmit = {handleSubmit}
            />
        </Paper>
    )
}

AssertionComments.propTypes = {
    assertionId: PropTypes.number.isRequired,
    hasAccess: PropTypes.bool.isRequired
}

export default AssertionComments