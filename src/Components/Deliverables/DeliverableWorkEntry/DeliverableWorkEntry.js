import { LinkOffOutlined } from '@mui/icons-material'
import { Box, Grid, IconButton, LinearProgress, Link, Stack, Tooltip, Typography } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById } from 'Redux/Deliverables/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'
import { normalise, roundedPercent } from 'Utilities/progressHelpers'

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
                    <Tooltip
                        followCursor
                        disableInteractive
                        title = {roundedPercent(completion?.value, completion?.target)}
                    >
                        <div>
                            <HrefText
                                text = {deliverable.title}
                                href = {completion.gitlabEpic?.webUrl}
                                color = 'secondary'
                            />
                        </div>
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
                title = {roundedPercent(completion?.value, completion?.target)}
            >
                <Box display = 'flex' alignItems = 'center'>
                    <Box minWidth = {35}>
                        <Typography variant = 'body2' color = 'text.secondary'>
                            {Math.floor(normalise(completion?.value, completion?.target)) + '%'}
                        </Typography>
                    </Box>
                    <Box width = '100%' marginLeft = {1}>
                        <LinearProgress
                            variant = 'determinate'
                            value = {normalise(completion?.value, completion?.target)}
                            color = 'primary'
                        />
                    </Box>
                </Box>
            </Tooltip>
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