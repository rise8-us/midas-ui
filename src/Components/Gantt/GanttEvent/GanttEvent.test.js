import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttEvent } from './index'

describe('<GanttEvent />', () => {

    const event = {
        title: 'This is the event title',
        startDate: '2021-03-03',
        dueDate: '2021-03-06'
    }

    test('should render', () => {
        const dateRange = [new Date('2021-01-01'), new Date('2022-01-01')]
        renderWithRouter(<GanttEvent event = {event} portfolioId = {1} dateRange = {dateRange}/>)

        expect(screen.getByText('This is the event title')).toBeInTheDocument()
    })
})