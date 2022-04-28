import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttTooltip } from './index'

describe('<GanttTooltip />', () => {

    const defaultProps = {
        dateRange: 'Fri Jul 01 2022',
        description: 'These are the details',
        onDeleteClick: jest.fn,
        onEditClick: jest.fn,
        permissions: { edit: true },
        title: 'This is the milestone title',
    }

    test('should render', () => {
        renderWithRouter(<GanttTooltip {...defaultProps}/>)

        expect(screen.getByText('This is the milestone title')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.getByText('Fri Jul 01 2022')).toBeInTheDocument()
    })
})