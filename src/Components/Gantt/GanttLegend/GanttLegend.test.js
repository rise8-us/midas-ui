import { render, screen } from 'Utilities/test-utils'
import { GanttLegend } from './index'

describe('<GanttLegend />', () => {

    test('should render', () => {
        render(<GanttLegend />)

        expect(screen.getByText('Legend:')).toBeInTheDocument()
        expect(screen.getByText('Milestones')).toBeInTheDocument()
        expect(screen.getByText('Wins')).toBeInTheDocument()
        expect(screen.getByTestId('EmojiEventsIcon')).toBeInTheDocument()
        expect(screen.getByText('Events')).toBeInTheDocument()
        expect(screen.getByText('Targets')).toBeInTheDocument()
    })

})