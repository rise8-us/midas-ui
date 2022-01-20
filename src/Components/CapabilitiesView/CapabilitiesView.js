import { AddLinkOutlined } from '@mui/icons-material'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { SearchEpics } from 'Components/Search'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
    }
}))

export default function CapabilitiesView() {

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    const [open, setOpen] = useState(false)

    return (
        <Stack marginX = '16%' spacing = {1}>
            <Stack direction = 'row' justifyContent = 'space-between'>
                <Typography variant = 'subtitle1'>Epics linked to the deliverable</Typography>
                {hasEdit &&
                    <StyledButton
                        size = 'small'
                        color = {open ? 'primary' : 'secondary'}
                        style = {{
                            whiteSpace: 'nowrap',
                            borderRadius: '8px',
                            padding: '0 16px'
                        }}
                        endIcon = {<AddLinkOutlined />}
                        onClick = {() => setOpen(prev => !prev)}
                        variant = 'outlined'
                    >
                        link epic
                    </StyledButton>
                }
            </Stack>
            <Divider style = {{ marginBottom: '8px' }}/>
            {open && <SearchEpics onChange = {(_e, values) => values}/>}
        </Stack>
    )
}