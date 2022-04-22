import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttMilestoneTooltip } from './index'

describe('<GanttMilestoneTooltip />', () => {

    const milestone = {
        title: 'This is the target title',
        dueDate: '2022-06-31',
        description: 'These are the details',
    }

    test('should render', () => {
        renderWithRouter(<GanttMilestoneTooltip milestone = {milestone}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.getByText('Fri Jul 01 2022')).toBeInTheDocument()
    })
})