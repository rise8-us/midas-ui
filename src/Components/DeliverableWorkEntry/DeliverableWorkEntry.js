import { LinkOffOutlined } from '@mui/icons-material'
import { Grid, IconButton, Link, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'
import { selectEpicById } from 'Redux/Epics/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    }
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main
    }
}))

export default function DeliverableWorkEntry({ id, productId, epicId, title }) {
    const dispatch = useDispatch()

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const product = useSelector(state => selectProductById(state, productId))
    const epic = useSelector(state => selectEpicById(state, epicId))

    const onClickUnlink = () => {
        dispatch(requestDeleteDeliverable(id))
    }

    useEffect(() => {
        dispatch(requestFetchSearchEpics('id:' + epicId))
    }, [])

    return (
        <Grid container alignItems = 'center' height = '34px' >
            <Grid item xs = {8}>
                <Link href = {epic.webUrl} target = '_blank' rel = 'noopener noreferrer' underline = 'hover'>
                    <StyledTypography color = 'secondary'>
                        {title}
                    </StyledTypography>
                </Link>
            </Grid>
            <Grid item xs = 'auto' marginLeft = 'auto'>
                <Link to = {'/products/' + productId + '/overview'} underline = 'none' component = {NavLink}>
                    <StyledTypography color = 'secondary'>
                        {product.name}
                    </StyledTypography>
                </Link>
            </Grid>
            {hasEdit &&
                <Grid item xs = 'auto' marginLeft = 'auto'>
                    <StyledIconButton size = 'small' color = 'secondary' onClick = {onClickUnlink}>
                        <LinkOffOutlined size = 'small'/>
                    </StyledIconButton>
                </Grid>
            }
        </Grid>
    )
}

DeliverableWorkEntry.propTypes = {
    id: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    epicId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}
