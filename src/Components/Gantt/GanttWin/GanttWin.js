import { EmojiEvents } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteWin } from 'Redux/Wins/actions'
import WinConstants from 'Redux/Wins/constants'
import { styled } from 'Styles/materialThemes'
import { parseStringToDate } from 'Utilities/dateHelpers'
import { GanttTooltip } from '../GanttTooltip'

const StyledDiv = styled('div')(() => ({
    margin: 'auto',
    textAlign: 'center',
    transform: 'translateX(-14.5px)',
}))

export default function GanttWin({ win }) {
    const dispatch = useDispatch()

    const { portfolioId, dueDate, id, title, type } = win
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const updateWin = () => {
        dispatch(openPopup(WinConstants.UPDATE_WIN, 'WinPopup', { id, portfolioId }))
    }

    const deleteWin = () => {
        dispatch(openPopup(WinConstants.DELETE_WIN, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteWin,
            constant: WinConstants.DELETE_WIN
        }))
    }

    return (
        <StyledDiv>
            <Tooltip
                arrow
                title = {
                    <GanttTooltip
                        dateRange = {parseStringToDate(dueDate).toDateString()}
                        win = {win}
                        onDeleteClick = {deleteWin}
                        onEditClick = {updateWin}
                        permissions = {permissions}
                        title = {win.title}
                    />
                }
            >
                <EmojiEvents style = {{ fontSize: '1.85rem' }} color = 'primary'/>
            </Tooltip>
        </StyledDiv>
    )
}

GanttWin.propTypes = {
    win: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        dueDate: PropTypes.string,
    }).isRequired
}