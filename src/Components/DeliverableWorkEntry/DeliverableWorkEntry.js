import { LinkOffOutlined } from '@mui/icons-material'
import { Grid, IconButton, LinearProgress, Link, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById } from 'Redux/Deliverables/selectors'
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

const normalise = (value, target) => isNaN(value) && isNaN(target) ? 0 : (value / target) * 100

const getTitle = (title, href) => {
    return href ? (
        <Link
            href = {href}
            target = '_blank'
            rel = 'noopener noreferrer'
            underline = 'hover'
            data-testid = 'DeliverableWorkEntry__title-link-wrap'
        >
            <StyledTypography color = 'secondary'>
                {title}
            </StyledTypography>
        </Link>
    ) : (
        <Typography color = 'secondary'>
            {title}
        </Typography>
    )
}
export default function DeliverableWorkEntry({ id }) {
    const dispatch = useDispatch()

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    const deliverable = useSelector(state => selectDeliverableById(state, id))
    const product = useSelector(state => selectProductById(state, deliverable?.productId))
    const { completion } = deliverable

    const onClickUnlink = () => {
        dispatch(requestDeleteDeliverable(id))
    }

    return (
        <Stack marginBottom = {1}>
            <Grid container alignItems = 'center' height = '34px' >
                <Grid item xs = {8}>
                    <Tooltip
                        followCursor
                        disableInteractive
                        title = {normalise(completion?.value, completion?.target) + '% completed'}
                    >
                        {getTitle(deliverable.title, completion.gitlabEpic?.webUrl)}
                    </Tooltip>
                </Grid>
                <Grid item xs = 'auto' marginLeft = 'auto'>
                    <Link to = {'/products/' + product?.id + '/overview'} underline = 'none' component = {NavLink}>
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
            <Tooltip
                followCursor
                disableInteractive
                title = {normalise(completion?.value, completion?.target) + '% completed'}
            >
                <LinearProgress
                    variant = 'determinate'
                    value = {normalise(completion?.value, completion?.target)}
                    color = 'primary'
                />
            </Tooltip>
        </Stack>
    )
}

DeliverableWorkEntry.propTypes = {
    id: PropTypes.number.isRequired
}
