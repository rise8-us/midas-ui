import { Grid, IconButton, Typography } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import { TeamMember } from 'Components/TeamMember'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import TeamConstants from 'Redux/Teams/constants'
import { selectTeamByProductId } from 'Redux/Teams/selectors'

function ProductTeam({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const team = useSelector(state => selectTeamByProductId(state, productId))

    const openCreateTeamPopup = () => dispatch(
        openPopup(TeamConstants.CREATE_TEAM, 'TeamPopup', { productIds: [productId] }))

    const openUpdateTeamPopup = () => dispatch(
        openPopup(TeamConstants.UPDATE_TEAM, 'TeamPopup', { id: team.id }))

    return (
        <Grid container wrap = 'wrap' style = {{ marginLeft: '3px' }}>
            <Grid container item xs = {12} s = {12} style = {{ paddingBottom: '8px' }} justifyContent = 'space-between'>
                <Grid item>
                    <Typography variant = 'h6'>TEAM</Typography>
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
            {team &&
                <Grid container item spacing = {1}>
                    <Grid item xs = {6} s = {6}>
                        <TeamMember
                            id = {team.productManagerId}
                            title = 'Product Manager'
                            noUserText = 'User Not Assigned'
                        />
                    </Grid>
                    <Grid item xs = {6} s = {6}>
                        <TeamMember
                            id = {team.designerId}
                            title = 'Product Designer'
                            noUserText = 'User Not Assigned'
                        />
                    </Grid>
                    <Grid item xs = {6} s = {6}>
                        <TeamMember
                            id = {team.techLeadId}
                            title = 'Technical Lead'
                            noUserText = 'User Not Assigned'
                        />
                    </Grid>
                    {team.userIds?.map((id, index) =>
                        <Grid item xs = {6} s = {6} key = {index}>
                            <TeamMember id = {id} title = 'Developer' />
                        </Grid>
                    )}
                </Grid>
            }
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