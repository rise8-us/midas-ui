import { render, screen, userEvent } from 'Utilities/test-utils'
import { GanttChart } from './index'

describe('<GanttChart />', () => {

    const mockEntries = [
        {
            title: 'first entry from last year',
            startDate: '2021-01-15',
            dueDate: '2022-10-01',
            type: 'target'
        }, {
            title: 'outside of range left',
            dueDate: '2021-12-01',
            type: 'milestone'
        }, {
            title: 'outside of range right',
            dueDate: '2023-1-01',
            type: 'milestone'
        }, {
            title: 'test entry3',
            startDate: '2022-07-01',
            dueDate: '2023-2-01',
            type: 'target'
        }
    ]

    test('should render', () => {
        render(<GanttChart startDate = {new Date(2022, 0, 1)} entries = {mockEntries} maxHeight = '800px'/>)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })

    test('should move left', () => {
        render(<GanttChart startDate = {new Date(2022, 0, 1)} entries = {mockEntries} maxHeight = '800px'/>)
        expect(screen.queryByText('outside of range left')).not.toBeInTheDocument()
        userEvent.click(screen.getByTestId('GanttActionBar__button-left-button'))
        expect(screen.getByText('outside of range left')).toBeInTheDocument()
    })

    test('should move right', () => {
        render(<GanttChart startDate = {new Date(2022, 0, 1)} entries = {mockEntries} maxHeight = '800px'/>)
        userEvent.click(screen.getByTestId('GanttActionBar__button-right-button'))
        expect(screen.getByText('outside of range right')).toBeInTheDocument()
    })

})
