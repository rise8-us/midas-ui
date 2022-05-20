import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttEvent } from './index'

describe('<GanttEvent />', () => {

    const event = {
        id: 2,
        portfolioId: 1,
        type: 'event',
        title: 'This is the event title',
        startDate: '2021-03-03',
        dueDate: '2021-03-06',
        location: '',
        organizerIds: [],
        attendeeIds: []
    }

    const dateRange = [
        new Date('2021-01-01'),
        new Date('2021-06-31'),
    ]

    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const openPopupMock =
        useModuleMock('Redux/Popups/actions', 'openPopup')

    test('should render', () => {
        render(<GanttEvent event = {event} dateRange = {dateRange}/>)

        expect(screen.getByText('This is the event title')).toBeInTheDocument()
    })

    test('should handle onEditClick', async() => {
        useDispatchMock().mockReturnValue()
        selectUsersByIdsMock.mockReturnValue([])
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttEvent event = {event} dateRange = {dateRange}/>)

        userEvent.hover(screen.getByText('This is the event title'))
        userEvent.click(await screen.findByTestId('EditIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'event/update',
            'EventPopup',
            { id: 2, portfolioId: 1 }
        )
    })

    test('should handle onDeleteClick', async() => {
        useDispatchMock().mockReturnValue()
        selectUsersByIdsMock.mockReturnValue([])
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttEvent event = {event} dateRange = {dateRange}/>)

        userEvent.hover(screen.getByText('This is the event title'))
        userEvent.click(await screen.findByTestId('DeleteOutlineIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'event/delete',
            'DeletePopup',
            expect.objectContaining({
                constant: 'event/delete',
                id: 2,
                title: 'This is the event title',
                type: 'event'
            })

        )
    })
})