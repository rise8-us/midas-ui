import { render, screen } from 'Utilities/test-utils'
import { GanttBody } from './index'

describe('<GanttBody />', () => {

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
        }
    ]

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)

    test('should render', () => {
        render(
            <GanttBody
                entries = {mockEntries}
                maxHeight = '400px'
                dateRange = {[dateStart, dateEnd]}
                renderComponent = {(entry) => (<div>{entry.title}</div>)}
            />
        )

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
