import { Add, Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { Page } from 'Components/Page'
import { Table } from 'Components/Table'
import { Tag } from 'Components/Tag'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTag } from 'Redux/Tags/actions'
import TagConstants from 'Redux/Tags/constants'
import { selectAllTags } from 'Redux/Tags/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },
    height: 40,
}))

function Tags() {

    const dispatch = useDispatch()
    const allTags = useSelector(selectAllTags)

    const user = useSelector(selectUserLoggedIn)

    const createTag = () =>
        dispatch(openPopup(TagConstants.CREATE_TAG, 'TagPopup', { type: 'ALL' }))

    const buildRows = () => {
        return allTags.map((tag) => ({
            data: [
                buildTag(tag),
                tag.description,
                tag.tagType,
                buildColor(tag.color),
                buildActions(tag.id),
            ],
            properties: {},
        }))
    }

    const buildTag = (tag) => {
        return (
            <Box display = 'flex'>
                <Tag {...tag} />
            </Box>
        )
    }

    const buildColor = (color) => {
        return (
            <Typography variant = 'body2' style = {{ color }}>
                {color}
            </Typography>
        )
    }

    const buildActions = (id) => {
        return (
            <>
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() =>
                        dispatch(openPopup(TagConstants.UPDATE_TAG, 'TagPopup', { id }))
                    }
                    size = 'large'
                >
                    <Edit />
                </IconButton>
                {user.isAdmin && (
                    <IconButton
                        title = 'delete'
                        color = 'secondary'
                        onClick = {() => dispatch(requestDeleteTag(id))}
                        size = 'large'
                    >
                        <Delete />
                    </IconButton>
                )}
            </>
        )
    }

    return (
        <Page>
            <div style = {{ padding: '24px' }}>
                <Box
                    display = 'block'
                    width = '75vw'
                    margin = 'auto'
                    textAlign = 'right'
                    padding = '24px 0'
                >
                    <StyledButton variant = 'text' startIcon = {<Add />} onClick = {createTag}>
                        Add New Tag
                    </StyledButton>
                </Box>
                <Table
                    rows = {buildRows()}
                    columns = {['Tag', 'Description', 'Type', 'Color', '']}
                />
            </div>
        </Page>
    )
}

export default Tags
