import { Close } from '@mui/icons-material'
import { Card, CardHeader, IconButton } from '@mui/material'
import { AddComment, CommentsList } from 'Components/Comments'
import useWindowSize from 'Hooks/useWindowSize'
import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestCreateComment } from 'Redux/Comments/actions'

export const generateIdBasedOnType = (type, id) => ({
    assertionId: type === 'assertions' ? id : null,
    measureId: type === 'measures' ? id : null
})

export default function AssertionComments({ offsetTop }) {
    const ref = useRef()
    const dispatch = useDispatch()
    const browserSize = useWindowSize()

    const scroll = useSelector(state => state.app.pageScrollY)
    const assertionCommentId = useSelector(state => state.app.assertionCommentId)
    const assertionCommentType = useSelector(state => state.app.assertionCommentType)

    const selectedEntity = useSelector(state =>
        (assertionCommentType && assertionCommentId) ? state[assertionCommentType][assertionCommentId] : {})

    const [maxHeight, setMaxHeight] = useState((browserSize?.height ?? 0) - 88 - 33)
    const [height, setHeight] = useState(0)

    const handleSubmit = (value) => {
        dispatch(requestCreateComment({
            ...generateIdBasedOnType(assertionCommentType, assertionCommentId),
            text: value
        }))
    }

    const handleClose = () => {
        dispatch(setAssertionComment({
            assertionId: null,
            deletedAssertionId: null,
            type: null
        }))
    }

    useEffect(() => {
        selectedEntity.id === undefined && handleClose()
    }, [selectedEntity])

    useLayoutEffect(() => {
        if (offsetTop > scroll) setHeight(maxHeight - offsetTop + scroll)
        else setHeight(maxHeight)
    }, [scroll, maxHeight])

    useEffect(() => {
        setMaxHeight((browserSize?.height ?? 0) - 88 - 33)
    }, [browserSize])

    return (
        <Card
            ref = {ref}
            style = {{
                height: `${height}px`,
                maxHeight: `${maxHeight}px`,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                justifyContent: 'space-between'
            }}
            data-testid = 'AssertionComment__paper'
        >
            <CardHeader
                title = {selectedEntity?.text}
                titleTypographyProps = {{
                    variant: 'h6',
                    color: 'secondary',
                    style: { overflowWrap: 'anywhere' },
                }}
                action = {
                    <IconButton onClick = {handleClose} data-testid = 'AssertionComments__icon-close'>
                        <Close size = 'small' color = 'secondary'/>
                    </IconButton>
                }
            />
            <CommentsList
                commentProps = {{ handleStatusUpdates: true }}
                commentIds = {selectedEntity?.commentIds ?? []}
            />
            <div style = {{ flexGrow: 1 }}/>
            <AddComment onSubmit = {handleSubmit} handleEnterKey />
        </Card>
    )
}

AssertionComments.propTypes = {
    offsetTop: PropTypes.number
}

AssertionComments.defaultProps = {
    offsetTop: 0,
}