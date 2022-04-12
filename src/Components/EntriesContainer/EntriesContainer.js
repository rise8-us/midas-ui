import { GanttChart } from 'Components/Gantt'
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
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'

export default function EntriesContainer({ portfolioId }) {

    const dispatch = useDispatch()
    const searchValue = 'portfolio.id:' + portfolioId

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const entries = [
        ...milestones,
        ...events,
        ...targets
    ]

    const renderComponent = (entry, dateRange, index) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry}/>
        case 'milestone':
            return <GanttMilestone milestone = {entry} dateRange = {dateRange} index = {index} />
        case 'event':
            return <GanttEvent event = {entry}/>
        }
    }

    return (
        <GanttChart
            maxHeight = 'calc(100% - 200px)'
            entries = {entries}
            renderComponent = {renderComponent}
        />
    )
}

EntriesContainer.propTypes = {
    portfolioId: PropTypes.number.isRequired,
}

const mockTargets = [
    {
        title: 'Create Midas App',
        startDate: '2020-12-15',
        dueDate: '2021-11-01',
        type: 'target'
    }, {
        title: 'Create User Profiles',
        startDate: '2021-03-01',
        dueDate: '2021-10-16',
        type: 'target'
    }, {
        title: 'Create Products Page',
        startDate: '2021-07-01',
        dueDate: '2021-12-01',
        type: 'target'
    }, {
        title: 'Create Portfolios',
        startDate: '2022-10-01',
        dueDate: '2023-2-01',
        type: 'target'
    }, {
        title: 'test entry4',
        startDate: '2022-10-01',
        dueDate: '2023-2-01',
        type: 'target'
    }
]

const mockMilestones = [
    {
        title: 'Old Milestone',
        description: 'Second Milestone Test',
        dueDate: '2021-09-01',
        type: 'milestone',
        disableDefaultCSS: true
    },
    {
        title: 'Milestone1',
        description: 'First Milestone Test',
        dueDate: '2022-05-15',
        type: 'milestone',
        disableDefaultCSS: true
    },
    {
        title: 'Milestone2',
        description: 'Second Milestone Test',
        dueDate: '2022-8-24',
        type: 'milestone',
        disableDefaultCSS: true
    },
    {
        title: 'Milestone3',
        description: 'Second Milestone Test',
        dueDate: '2023-02-04',
        type: 'milestone',
        disableDefaultCSS: true
    }
]