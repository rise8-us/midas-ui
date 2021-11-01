import { Add, Edit } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import { Table } from 'Components/Table'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import SourceControlConstants from 'Redux/SourceControls/constants'
import { selectSourceControls } from 'Redux/SourceControls/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },

    height: 40,
}))

function SourceControlTab() {
    const dispatch = useDispatch()
    const allSourceControls = useSelector(selectSourceControls)

    const createSourceControl = () => {
        dispatch(
            openPopup(SourceControlConstants.CREATE_CONFIG, 'SourceControlPopup')
        )
    }

    const updateSourceControl = (id) => {
        dispatch(
            openPopup(SourceControlConstants.UPDATE_CONFIG, 'SourceControlPopup', {
                id,
            })
        )
    }

    const buildRows = () => {
        return allSourceControls.map((SourceControl) => ({
            data: [
                SourceControl.name,
                SourceControl.description,
                SourceControl.baseUrl,
                buildActions(SourceControl.id),
            ],
            properties: { strikeThrough: false },
        }))
    }

    const buildActions = (id) => {
        return (
            <>
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updateSourceControl(id)}
                    size = 'large'
                >
                    <Edit />
                </IconButton>
            </>
        )
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box
                display = 'block'
                width = '75vw'
                margin = 'auto'
                textAlign = 'right'
                padding = '24px 0'
            >
                <StyledButton
                    variant = 'text'
                    startIcon = {<Add />}
                    onClick = {createSourceControl}
                >
                    Add New Source Control
                </StyledButton>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Description', 'Base Url', '']}
            />
        </div>
    )
}

export default SourceControlTab
