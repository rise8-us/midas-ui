import { renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttMilestone } from './index'

describe('<Gantt Milestone />', () => {

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const openPopupMock =
            useModuleMock('Redux/Popups/actions', 'openPopup')

    const milestone = {
        id: 2,
        title: 'This is the milestone title',
        dueDate: '2022-06-31',
        description: 'These are the details',
        portfolioId: 1,
        type: 'milestone'
    }

    test('should render', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({})

        renderWithRouter(<GanttMilestone milestone = {milestone}/>)

        expect(screen.getByText('This is the milestone title')).toBeInTheDocument()
    })

    test('should handle onEditClick', async() => {
        useDispatchMock().mockReturnValue()
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        renderWithRouter(<GanttMilestone milestone = {milestone}/>)

        userEvent.hover(screen.getByText('This is the milestone title'))
        userEvent.click(await screen.findByTestId('EditIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'milestone/update',
            'MilestonePopup',
            { id: 2, 'portfolioId': 1 }
        )
    })

    test('should handle onDeleteClick', async() => {
        useDispatchMock().mockReturnValue()
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        renderWithRouter(<GanttMilestone milestone = {milestone}/>)

        userEvent.hover(screen.getByText('This is the milestone title'))
        userEvent.click(await screen.findByTestId('DeleteOutlineIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'milestone/delete',
            'DeletePopup',
            expect.objectContaining({
                'constant': 'milestone/delete',
                'id': 2,
                'title': 'This is the milestone title',
                'type': 'milestone'
            })

        )
    })
})