import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button, useTheme } from '@mui/material'
import { GanttChart } from 'Components/Gantt'
import GanttAddNewItem from 'Components/Gantt/GanttAddNewItem/GanttAddNewItem'
import { GanttEvent } from 'Components/Gantt/GanttEvent'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'
import GanttView from 'Components/Gantt/GanttView/GanttView'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchDeliverables } from 'Redux/Deliverables/actions'
import { requestSearchEvents } from 'Redux/Events/actions'
import { selectEventsByPortfolioId } from 'Redux/Events/selectors'
import { requestSearchMilestones } from 'Redux/Milestones/actions'
import { selectMilestonesByPortfolioId } from 'Redux/Milestones/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'
import { sortArrayByDateAndTitle } from 'Utilities/sorting'

export default function EntriesContainer({ portfolioId }) {

    const dispatch = useDispatch()
    const theme = useTheme()
    const searchValue = 'portfolio.id:' + portfolioId
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue + ' AND parent.id:~'))
        dispatch(requestSearchDeliverables('capability.' + searchValue))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const entries = [
        ...milestones,
        ...events,
        ...targets.filter(t => t.parentId === null).sort(sortArrayByDateAndTitle),
    ]

    const [dateStart, setDateStart] = useState(new Date())

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

    const [option, setOption] = useState({ title: '6M', viewBy: 'month', scope: 6, leadingColumns: 2 })

    useEffect(() => {
        const newDateStart = new Date()
        newDateStart.setDate(1)
        newDateStart.setHours(0, 0, 0)

        if (option.viewBy === 'year') {
            newDateStart.setMonth(0)
        }

        setDateStart(newDateStart)
    }, [option])

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
                additionalActions: permissions.edit ?
                    <GanttAddNewItem portfolioId = {portfolioId} /> : <GanttView onChange = {setOption}/>
            }}
            chartBackgroundColor = {theme.palette.background.paper}
            headerStyles = {{
                color: theme.palette.grey[600],
                ...theme.typography.subtitle2,
                marginLeft: theme.spacing(1),
                marginBlock: 'unset'
            }}
            todayColor = {theme.palette.primary.main}
            scope = {option.scope}
            leadingColumns = {option.leadingColumns}
            viewBy = {option.viewBy}
        />
    )
}

EntriesContainer.propTypes = {
    portfolioId: PropTypes.number.isRequired,
}
