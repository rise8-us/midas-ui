import { Box } from '@mui/material'
import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttBody from './GanttBody'

describe('<Gantt Body />', () => {

    const renderComponent = (target) => {
        return (
            <Box data-testid = 'GanttEntry__defaultEntryWrapper'>
                <p style = {{ marginBlock: 0, padding: '8px' }}>
                    {target.title}
                </p>
            </Box>
        )
    }

    const mockEntries = [
        {
            title: 'first entry from last year',
            startDate: '2021-11-15',
            dueDate: '2022-06-01'
        }, {
            title: 'test entry2',
            startDate: '2022-03-01',
            dueDate: '2022-07-16'
        }, {
            title: 'test entry3',
            startDate: '2022-07-01',
            dueDate: '2023-2-01'
        }]

    const MAX_HEIGHT = 'calc(100vh - 156px)'

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)
    let dateRange = [dateStart, dateEnd]

    test('should render', () => {
        renderWithRouter(<GanttBody
            entries = {mockEntries}
            maxHeight = {MAX_HEIGHT}
            dateRange = {dateRange}
            renderComponent = {renderComponent}
        />)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
