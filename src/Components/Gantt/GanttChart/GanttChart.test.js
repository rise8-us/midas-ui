import { render, screen } from 'Utilities/test-utils'
import { GanttChart } from './index'

describe('<GanttChart />', () => {

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
        render(<GanttChart entries = {mockEntries} maxHeight = '800px'/>)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
