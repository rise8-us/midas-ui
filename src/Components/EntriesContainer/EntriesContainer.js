import { GanttChart } from 'Components/Gantt'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'

export default function EntriesContainer() {

    const entries = [
        ...mockMilestones,
        //events
        ...newMockEntries
    ]

    const renderComponent = (entry, dateRange, index) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry}/>
        case 'milestone':
            return <GanttMilestone milestone = {entry} dateRange = {dateRange} index = {index} />
        case 'event':
            break
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

// EntriesContainer.propTypes = {
//     portfolioId: PropTypes.number.isRequired,
// }

const newMockEntries = [
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