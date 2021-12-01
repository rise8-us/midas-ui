import { Article } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { alpha } from '@mui/system'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateCapability, requestUpdateCapability } from 'Redux/Capabilities/actions'
import CapabilityConstants from 'Redux/Capabilities/constants'
import { selectCapabilityById } from 'Redux/Capabilities/selectors'
import { styled } from 'Styles/materialThemes'

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
    border: '1px solid',
    borderRadius: theme.spacing(1),
    borderColor: alpha(theme.palette.secondary.main, .4),
    '&:hover': {
        borderColor: theme.palette.text.primary,
    },
}))

const StyledArticle = styled(Article)(({ theme }) => ({
    marginRight: theme.spacing(1)
}))

const StyledAutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme, color }) => ({
    ...theme.typography.body2,
    color: theme.palette[color].main,
    '&> *': { textTransform: 'uppercase' }
}))

const StyledAutoSaveTextFieldDescription = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Capability' : 'Update Capability',
        constant: create ? CapabilityConstants.CREATE_CAPABILITY : CapabilityConstants.UPDATE_CAPABILITY,
        request: (data) => create ? requestCreateCapability(data) : requestUpdateCapability(data)
    }
}
function Capability({ id, hasEdit }) {
    const dispatch = useDispatch()

    const capability = useSelector((state) => selectCapabilityById(state, id))
    const context = initDetails(capability.id === undefined)

    const updateCapability = (key, value) => {
        dispatch(context.request({
            referenceId: 0,
            ...capability,
            [key]: value,
        }))
    }

    return (
        <StyledGrid container direction = 'column'>
            <Grid item>
                <Box display = 'flex' alignItems = 'center'>
                    <StyledArticle fontSize = 'small' color = {context.isCreate ? 'secondary' : 'primary'}/>
                    <StyledAutoSaveTextFieldTitle
                        color = {context.isCreate ? 'secondary' : 'primary'}
                        canEdit = {hasEdit}
                        initialValue = {capability.title}
                        onSave = {(value) => updateCapability('title', value)}
                        placeholder = 'NEW CAPABILITY NEEDS STATEMENT'
                        clearAfterSave = {context.isCreate}
                        revertOnEmpty
                        fullWidth
                    />
                </Box>
            </Grid>
            <Grid item paddingLeft = '30px'>
                {!context.isCreate && (hasEdit || capability.description) &&
                    <StyledAutoSaveTextFieldDescription
                        canEdit = {hasEdit}
                        initialValue = {capability.description}
                        onSave = {(value) => updateCapability('description', value)}
                        placeholder = 'Enter Operational Context'
                        fullWidth
                        multiline
                    />
                }
            </Grid>
        </StyledGrid>
    )
}

Capability.propTypes = {
    id: PropTypes.number,
    hasEdit: PropTypes.bool
}

Capability.defaultProps = {
    id: undefined,
    hasEdit: false
}

export default Capability