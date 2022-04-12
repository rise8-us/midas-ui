import { Box } from '@mui/material'
import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttEntry from './GanttEntry'

let dateStart = new Date()
let dateEnd = new Date()
dateStart.setMonth(dateStart.getMonth() - 3)
dateEnd.setMonth(dateStart.getMonth() + 12)
let dateRange = [dateStart, dateEnd]

describe('<Gantt Entry />', () => {

    const renderComponent = (target) => {
        return (
            <Box data-testid = 'GanttEntry__defaultEntryWrapper'>
                <p style = {{ marginBlock: 0, padding: '8px' }}>
                    {target.title}
                </p>
            </Box>
        )
    }

    const entry = {
        title: 'This is the title',
        startDate: '2020-01-01',
        endDate: '2025-12-31'
    }

    test('should render', () => {
        renderWithRouter(<GanttEntry
            startDate = {entry.startDate}
            dueDate = {entry.dueDate}
            index = {1}
            dateRange = {dateRange}
        >
            renderComponent = {renderComponent(entry)}
        </GanttEntry>)

        expect(screen.getByText('This is the title')).toBeInTheDocument()
    })
})
