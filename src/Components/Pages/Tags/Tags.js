import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLoggedIn } from '../../../Redux/Auth/selectors'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestDeleteTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import { selectAllTags } from '../../../Redux/Tags/selectors'
import { Page } from '../../Page'
import { Table } from '../../Table'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Tags() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allTags = useSelector(selectAllTags)

    const user = useSelector(getUserLoggedIn)

    const createTag = () => dispatch(openPopup(TagConstants.CREATE_TAG, 'CreateTagPopup'))

    const buildRows = () => {
        return allTags.map(tag => [buildTag(tag), tag.description, buildColor(tag.color), buildActions(tag.id)])
    }

    const buildTag = (tag) => {
        return (
            <Box display = 'flex'>
                <Tag {...tag}/>
            </Box>
        )
    }

    const buildColor = (color) => {
        return (
            <Typography variant = 'body2' style = {{ color }}>{color}</Typography>
        )
    }

    const buildActions = (id) => {
        return (
            <>
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => dispatch(openPopup(TagConstants.UPDATE_TAG, 'UpdateTagPopup', { id }))}
                >
                    <Edit />
                </IconButton>
                {user.isAdmin &&
                    <IconButton
                        title = 'delete'
                        color = 'secondary'
                        onClick = {() => dispatch(requestDeleteTag(id))}
                    >
                        <Delete />
                    </IconButton>
                }
            </>
        )
    }

    return (
        <Page>
            <div style = {{ padding: '24px' }}>
                <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                    <Button
                        variant = 'text'
                        startIcon = {<Add/>}
                        className = {classes.button}
                        onClick = {createTag}
                    >
                        Add New Tag
                    </Button>
                </Box>
                <Table
                    rows = {buildRows()}
                    columns = {['Tag', 'Description', 'Color', '']}
                />
            </div>
        </Page>
    )
}

export default Tags
