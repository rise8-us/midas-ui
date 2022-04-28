import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttActionButtons } from '../GanttActionButtons'
import { GanttTargetHeader } from '../GanttTargetHeader'
import { GanttTargetTooltip } from '../GanttTargetTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: '4px',
    color: theme.palette.gantt.target.dark.text,
    background: theme.palette.gantt.target.dark.background,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    textAlign: 'left',
    padding: theme.spacing(0, 1),
    minHeight: '40px',
    minWidth: '84px',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black'
    }
}))

export default function GanttTarget({ target }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, type } = target
    const dateString = parseDate(startDate, dueDate)
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const updateTarget = () =>
        dispatch(openPopup(TargetConstants.UPDATE_TARGET, 'TargetPopup', { id, portfolioId }))

    const deleteTarget = () =>
        dispatch(openPopup(TargetConstants.DELETE_TARGET, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteTarget,
            constant: TargetConstants.DELETE_TARGET
        }))

    return (
        <Tooltip title = {<GanttTargetTooltip target = {target}/>} arrow followCursor>
            <StyledDiv data-testid = 'GanttTarget__card' >
                <div style = {{ maxWidth: permissions.edit ? 'calc(100% - 76px)' : '100%' }}>
                    <GanttTargetHeader title = {title} dateRange = {dateString} />
                </div>
                {permissions.edit &&
                    <div style = {{ display: 'flex', maxHeight: '40px' }}>
                        <GanttActionButtons onEditClick = {updateTarget} onDeleteClick = {deleteTarget}/>
                    </div>
                }
            </StyledDiv>
        </Tooltip>
    )
}

GanttTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string
    }).isRequired
}