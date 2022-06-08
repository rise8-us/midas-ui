import { act, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttPortfolioNote } from './index'

jest.mock('Hooks/useDebounce', () => function testing(value) { return value })

describe('<GanttPortfolioNote />', () => {
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const requestUpdatePortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestUpdatePortfolio')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    const ganttData = {
        id: 1,
        ganttNote: 'this is a note',
        ganttNoteModifiedBy: {
            displayName: 'displayName'
        },
        ganttNoteModifiedAt: '2022-01-01T00:00:00.000Z'
    }

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue(ganttData)
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should not render with no portfolio id', () => {
        selectPortfolioByIdMock.mockReturnValue({})
        render(<GanttPortfolioNote id = {1} />)

        expect(screen.queryByTestId('GanttPortfolioNote__wrap')).not.toBeInTheDocument()
    })

    test('should render - no edit - with data - displayName', async() => {
        render(<GanttPortfolioNote id = {1} />)
        userEvent.hover(screen.getByTestId('GanttPortfolioNote__last-edited'))

        expect(screen.getByText(ganttData.ganttNote)).toBeInTheDocument()
        expect(screen.getByTestId('GanttPortfolioNote__last-edited')).toBeInTheDocument()
        expect(await screen.findByText('Modified By: displayName')).toBeInTheDocument()
    })

    test('should render - no edit - with data - username', async() => {
        selectPortfolioByIdMock.mockReturnValue({ ...ganttData, ganttNoteModifiedBy: { username: 'username' } })

        render(<GanttPortfolioNote id = {1} />)
        userEvent.hover(screen.getByTestId('GanttPortfolioNote__last-edited'))

        expect(await screen.findByText('Modified By: username')).toBeInTheDocument()
    })

    test('should render - edit - with data', () => {
        selectPortfolioPagePermissionMock
            .mockReturnValueOnce({ edit: false })
            .mockReturnValue({ edit: true })

        render(<GanttPortfolioNote id = {1} />)

        expect(screen.getByDisplayValue(ganttData.ganttNote)).toBeInTheDocument()
    })


    test('should set focus to input', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttPortfolioNote id = {1} />)
        userEvent.click(screen.getByTestId('NotesIcon'))

        expect(screen.getByTestId('GanttPortfolioNote__input')).toHaveFocus()
    })

    test('should handle onChange - save', () => {
        jest.useFakeTimers()
        useDispatchMock().mockReturnValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttPortfolioNote id = {1} />)
        userEvent.type(screen.getByPlaceholderText('Add a Roadmap note...'), 't')

        act(() => {
            jest.runAllTimers()
        })

        expect(requestUpdatePortfolioMock).toHaveBeenCalled()

        jest.useRealTimers()
    })

    test('should handle onChange - revert {esc}', () => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttPortfolioNote id = {1} />)
        expect(screen.queryByDisplayValue(ganttData.ganttNote)).not.toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText('Add a Roadmap note...'), 't{esc}')

        expect(screen.getByDisplayValue(ganttData.ganttNote)).toBeInTheDocument()
    })
})
