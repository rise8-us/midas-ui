import { Box } from '@mui/material'
import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttChart from './GanttChart'

describe('<Gantt Chart />', () => {

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
            startDate: '2021-01-15',
            dueDate: '2022-10-01',
            type: 'target'
        }, {
            title: 'test entry2',
            startDate: '2022-03-01',
            dueDate: '2022-07-16',
            type: 'target'
        }, {
            title: 'test entry3',
            startDate: '2022-07-01',
            dueDate: '2023-2-01',
            type: 'target'
        }
    ]

    test('should render', () => {
        renderWithRouter(<GanttChart entries = {mockEntries} maxHeight = '800px' renderComponent = {renderComponent}/>)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
