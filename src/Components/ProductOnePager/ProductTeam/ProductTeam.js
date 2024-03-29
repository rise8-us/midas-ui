import { Add, Edit } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { TeamMember } from 'Components/TeamMember'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import { selectProductById, selectProductOwnerByProductId } from 'Redux/Products/selectors'
import TeamConstants from 'Redux/Teams/constants'
import { selectTeamById } from 'Redux/Teams/selectors'

function ProductTeam({ productId, hasEdit }) {
    const dispatch = useDispatch()
    const product = useSelector(state => selectProductById(state, productId))
    const team = useSelector(state => selectTeamById(state, product?.personnel?.teamIds[0]))
    const productOwnerId = useSelector(state => selectProductOwnerByProductId(state, productId))

    const userIds = team.userIds.filter(uId =>
        uId !== team.productManagerId &&
        uId !== team.designerId &&
        uId !== team.techLeadId
    )

    const openCreateTeamPopup = () => dispatch(
        openPopup(TeamConstants.CREATE_TEAM, 'TeamPopup', { productIds: [productId] }))

    const openUpdateTeamPopup = () => dispatch(
        openPopup(TeamConstants.UPDATE_TEAM, 'TeamPopup', { id: team.id, productIds: [productId] }))

    return (
        <Grid container wrap = 'wrap' marginLeft = '3px'>
            <Grid container item height = '34px' paddingBottom = {1} columnSpacing = {1}>
                <Grid item>
                    <Typography variant = 'h6'>TEAM</Typography>
                </Grid>
                <Grid item>
                    <Typography variant = 'h6' color = 'text.secondary'>
                        {team.name ? '(' + team.name + ')' : '(None)'}
                    </Typography>
                </Grid>
                {hasEdit && team.id !== undefined &&
                    <Grid item>
                        <IconButton size = 'small' onClick = {openUpdateTeamPopup}>
                            <Edit color = 'secondary' title = 'edit team'/>
                        </IconButton>
                    </Grid>
                }
                {hasEdit && team.id === undefined &&
                    <Grid item>
                        <IconButton size = 'small' onClick = {openCreateTeamPopup}>
                            <Add color = 'secondary' title = 'add team'/>
                        </IconButton>
                    </Grid>
                }
            </Grid>
            <Grid container item spacing = {1}>
                <Grid item xs = {6}>
                    <TeamMember
                        id = {productOwnerId}
                        title = 'Product Owner'
                        noUserText = 'User Not Assigned'
                    />
                </Grid>
                <Grid item xs = {6}>
                    <TeamMember
                        id = {team.productManagerId}
                        title = 'Product Manager'
                        noUserText = 'User Not Assigned'
                    />
                </Grid>
                <Grid item xs = {6}>
                    <TeamMember
                        id = {team.designerId}
                        title = 'Product Designer'
                        noUserText = 'User Not Assigned'
                    />
                </Grid>
                <Grid item xs = {6}>
                    <TeamMember
                        id = {team.techLeadId}
                        title = 'Technical Lead'
                        noUserText = 'User Not Assigned'
                    />
                </Grid>
                {userIds.map((id, index) =>
                    <Grid item xs = {6} key = {index}>
                        <TeamMember id = {id} title = 'Team Member' />
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

ProductTeam.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProductTeam.defaultProps = {
    hasEdit: true
}

export default ProductTeam