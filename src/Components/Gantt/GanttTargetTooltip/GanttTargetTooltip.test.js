import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttTargetTooltip } from './index'

describe('<GanttTargetTooltip />', () => {

    const target = {
        title: 'This is the target title',
        description: 'These are the details',
        dueDate: '2022-06-31',
        startDate: '2022-06-01'
    }

    test('should render', () => {
        renderWithRouter(<GanttTargetTooltip target = {target}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.getByText('Due Date:')).toBeInTheDocument()
        expect(screen.getByText('Fri Jul 01 2022')).toBeInTheDocument()
        expect(screen.getByText('Start Date:')).toBeInTheDocument()
        expect(screen.getByText('Wed Jun 01 2022')).toBeInTheDocument()
    })
})