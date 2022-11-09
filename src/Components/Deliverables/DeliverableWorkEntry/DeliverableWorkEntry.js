import { LinkOffOutlined } from '@mui/icons-material'
import { Grid, IconButton, Link, Stack, Typography } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById } from 'Redux/Deliverables/selectors'
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

export default function DeliverableWorkEntry({ id, hasEdit }) {
    const dispatch = useDispatch()

    const deliverable = useSelector(state => selectDeliverableById(state, id))
    const product = useSelector(state => selectProductById(state, deliverable?.productId))
    const { completion } = deliverable

    const onClickUnlink = () => {
        dispatch(requestDeleteDeliverable(id))
    }

    return (
        <Stack marginBottom = {1}>
            <Grid container alignItems = 'center'>
                <Grid item xs = {8}>
                    <div>
                        <HrefText
                            text = {deliverable.title}
                            href = {completion.gitlabEpic?.webUrl}
                            color = 'secondary'
                        />
                    </div>
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
        </Stack>
    )
}

DeliverableWorkEntry.propTypes = {
    hasEdit: PropTypes.bool,
    id: PropTypes.number.isRequired,
}

DeliverableWorkEntry.defaultProps = {
    hasEdit: false
}
