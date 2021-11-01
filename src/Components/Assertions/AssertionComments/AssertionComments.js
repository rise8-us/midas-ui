import { Paper, Typography } from '@mui/material'
import { AssertionStatusDropdown } from 'Components/Assertions'
import { AddComment, CommentsList } from 'Components/Comments'
import useWindowSize from 'Hooks/useWindowSize'
import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestUpdateAssertion } from 'Redux/Assertions/actions'
import { hasProductOrTeamAccess } from 'Redux/Auth/selectors'
import { requestCreateComment } from 'Redux/Comments/actions'

function AssertionComments({ assertionId }) {
    const ref = useRef()
    const browserSize = useWindowSize()
    const scroll = useSelector(state => state.app.pageScrollY)
    const dispatch = useDispatch()

    const assertion = useSelector(state => state.assertions[assertionId])
    const hasAccess = useSelector(state => hasProductOrTeamAccess(state, assertion?.productId))

    const selectedStatus = useSelector(state => state.app.assertionStatus[assertion?.status ?? 'NOT_STARTED'])
    const [status, setStatus] = useState(selectedStatus?.name ?? 'NOT_STARTED')

    const [maxHeight, setMaxHeight] = useState((browserSize?.height ?? 0) - 88 - 33)
    const [height, setHeight] = useState(0)

    const conditionalAssertionUpdate = () => {
        if (hasAccess) {
            dispatch(requestUpdateAssertion({
                id: assertionId,
                text: assertion.text,
                children: [],
                status: status
            }))
        }
    }

    const handleSubmit = (value) => {
        dispatch(requestCreateComment({
            assertionId,
            text: `${value}###${status}`
        })).then(() => conditionalAssertionUpdate())
    }

    if (assertion === undefined) {
        dispatch(setAssertionComment({ assertionId: null, deletedAssertionId: null }))
    }

    useLayoutEffect(() => {
        const offsetTop = ref.current?.offsetTop
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
            <Typography
                variant = 'h5'
                style = {{
                    padding: '6px 10px',
                    overflowWrap: 'anywhere',
                }}
            >
                {assertion?.text}
            </Typography>
            <CommentsList
                commentProps = {{ handleStatusUpdates: true }}
                commentIds = {assertion?.commentIds ?? []}
            />
            <div style = {{ flexGrow: 1 }}/>
            <AddComment
                assertionId = {assertionId}
                additionalNode = { hasAccess
                    ? <AssertionStatusDropdown
                        option = {selectedStatus}
                        onChange = {setStatus}
                    /> : null
                }
                onSubmit = {handleSubmit}
            />
        </Paper>
    )
}

AssertionComments.propTypes = {
    assertionId: PropTypes.number.isRequired,
}

export default AssertionComments