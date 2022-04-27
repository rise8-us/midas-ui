import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button, useTheme } from '@mui/material'
import { GanttChart } from 'Components/Gantt'
import GanttAddNewItem from 'Components/Gantt/GanttAddNewItem/GanttAddNewItem'
import { GanttEvent } from 'Components/Gantt/GanttEvent'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchEvents } from 'Redux/Events/actions'
import { selectEventsByPortfolioId } from 'Redux/Events/selectors'
import { requestSearchMilestones } from 'Redux/Milestones/actions'
import { selectMilestonesByPortfolioId } from 'Redux/Milestones/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'
import { sortArrayByDate } from 'Utilities/sorting'

export default function EntriesContainer({ portfolioId }) {

    const dispatch = useDispatch()
    const theme = useTheme()
    const searchValue = 'portfolio.id:' + portfolioId
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue + ' AND parent_id:~'))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const entries = [
        ...milestones,
        ...events,
        ...targets.sort(sortArrayByDate),
    ]

    let dateStart = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateStart.setDate(1)
    dateStart.setHours(0, 0, 0)

    const renderComponent = (entry) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry}/>
        case 'milestone':
            return <GanttMilestone milestone = {entry}/>
        case 'event':
            return <GanttEvent event = {entry}/>
        }
    }

    return (
        <GanttChart
            startDate = {dateStart}
            maxHeight = 'calc(100vh - 280px)'
            entries = {entries}
            renderComponent = {renderComponent}
            actionBar = {{
                navLeftIcon: <ChevronLeft size = 'small' />,
                navRightIcon: <ChevronRight size = 'small' />,
                buttonComponent: Button,
                buttonProps: {
                    style: { minWidth: '34px', borderRadius: 0, borderRight: '1px solid black' },
                    size: 'small'
                },
                additionalActions: permissions.edit ? <GanttAddNewItem portfolioId = {portfolioId} /> : null
            }}
            chartBackgroundColor = {theme.palette.background.paper}
            headerStyles = {{
                color: theme.palette.grey[600],
                ...theme.typography.subtitle2,
                marginLeft: theme.spacing(1),
                marginBlock: 'unset'
            }}
            todayColor = {theme.palette.primary.main}
        />
    )
}

EntriesContainer.propTypes = {
    portfolioId: PropTypes.number.isRequired,
}
