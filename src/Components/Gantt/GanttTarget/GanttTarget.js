import { DeleteOutline, Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'

const defaultGanttEntryStyling = (theme) => {
    return {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        background: theme.palette.grey[800],
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
        textAlign: 'left',
        padding: theme.spacing(1)
    }
}
export default function GanttTarget({ target, portfolioId }) {

    const dispatch = useDispatch()
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const updateTarget = () =>
        dispatch(openPopup(TargetConstants.UPDATE_TARGET, 'TargetPopup', { id: target.id, portfolioId: portfolioId }))

    const deleteTarget = () => {
        dispatch(requestDeleteTarget(target.id))
    }

    return (
        <Box data-testid = 'GanttEntry__defaultEntryWrapper' sx = {defaultGanttEntryStyling}>
            <Typography>
                {target.title}
            </Typography>
            {permissions.edit &&
            <div style = {{ display: 'flex', paddingLeft: '10px' }}>
                <IconButton
                    onClick = {updateTarget}
                    color = 'secondary'
                    data-testid = 'GanttTarget__button-edit'
                    size = 'small'
                >
                    <Edit fontSize = 'small'/>
                </IconButton>
                <IconButton
                    onClick = {deleteTarget}
                    color = 'secondary'
                    data-testid = 'GanttTarget__button-delete'
                    size = 'small'
                >
                    <DeleteOutline fontSize = 'small'/>
                </IconButton>
            </div>
            }
        </Box>
    )
}

GanttTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }).isRequired,
    portfolioId: PropTypes.number.isRequired
}