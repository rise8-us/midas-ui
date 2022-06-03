import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttWin } from './index'

describe('<GanttWin />', () => {

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const openPopupMock =
            useModuleMock('Redux/Popups/actions', 'openPopup')

    const win = {
        id: 2,
        title: 'This is the win title',
        dueDate: '2022-06-31',
        description: 'These are the details',
        portfolioId: 1,
        type: 'win'
    }

    test('should render', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({})

        render(<GanttWin win = {win}/>)

        expect(screen.getByTestId('EmojiEventsIcon')).toBeInTheDocument()
    })

    test('should handle onEditClick', async() => {
        useDispatchMock().mockReturnValue()
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttWin win = {win}/>)

        userEvent.hover(screen.getByTestId('EmojiEventsIcon'))
        userEvent.click(await screen.findByTestId('EditIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'win/update',
            'WinPopup',
            { id: 2, portfolioId: 1 }
        )
    })

    test('should handle onDeleteClick', async() => {
        useDispatchMock().mockReturnValue()
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttWin win = {win}/>)

        userEvent.hover(screen.getByTestId('EmojiEventsIcon'))
        userEvent.click(await screen.findByTestId('DeleteOutlineIcon'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'win/delete',
            'DeletePopup',
            expect.objectContaining({
                constant: 'win/delete',
                id: 2,
                title: 'This is the win title',
                type: 'win'
            })

        )
    })
})