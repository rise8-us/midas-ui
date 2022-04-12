import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttEvent } from './index'

describe('<GanttEvent />', () => {

    const event = {
        title: 'This is the event title'
    }

    test('should render', () => {
        renderWithRouter(<GanttEvent event = {event}/>)

        expect(screen.getByText('This is the event title')).toBeInTheDocument()
    })
})