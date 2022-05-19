import { wait } from '@testing-library/user-event/dist/utils'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttTarget } from './index'

describe('<GanttTarget />', () => {

    const target = {
        id: 1,
        title: 'This is the target title',
        dueDate: '2022-06-31',
        startDate: '2022-06-01',
        description: 'These are the details',
        childrenIds: [],
        portfolioId: 1,
    }

    const newSubTarget = {
        title: 'Enter subtarget title',
        parentId: 1,
        portfolioId: 1,
        dueDate: '2022-06-31',
        startDate: '2022-06-01',
    }

    const foundEpics = [
        { id: 1, name: 'alpha', title: 'foo', totalWeight: 0, completedWeight: 0 }
    ]

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({})
        selectEpicsByIdsMock.mockReturnValue([])
        openPopupMock.mockReset()
    })

    test('should render', () => {
        render(<GanttTarget target = {target}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttTarget__target-progress')).not.toBeInTheDocument()
    })

    test('should handle onEditClick', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttTarget target = {target}/>)

        userEvent.click(screen.getByTestId('GanttActionButtons__edit'))
        expect(openPopupMock).toHaveBeenCalledWith(
            'target/update',
            'TargetPopup',
            {
                id: 1,
                portfolioId: 1
            }
        )
    })

    test('should handle onDeleteClick', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttTarget target = {target}/>)

        userEvent.click(screen.getByTestId('GanttActionButtons__delete'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'target/delete',
            'DeletePopup',
            expect.objectContaining({
                id: 1,
                constant: 'target/delete',
                title: 'This is the target title',
                type: undefined
            })
        )
    })

    test('should render description after expansion', async() => {
        const testExpand = jest.fn()
        render(<GanttTarget target = {target} setIsExpanded = {testExpand}/>)

        userEvent.click(screen.getByTestId('GanttTarget__expandButton_closed'))
        wait(800).then(() => {
            expect(testExpand).toBeCalledTimes(1)
        })
    })

    test('should send request to add SubTarget', () => {
        const requestCreateTargetMock = useModuleMock('Redux/Targets/actions', 'requestCreateTarget')
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        useDispatchMock()

        render(<GanttTarget target = {target}/>)

        userEvent.click(screen.getByTestId('GanttTarget__createSubTarget_button'))

        expect(requestCreateTargetMock).toHaveBeenCalledWith(newSubTarget)
    })

    test('should show progress bar', () => {
        selectEpicsByIdsMock.mockReturnValue(foundEpics)

        render(<GanttTarget target = {target}/>)

        expect(screen.getByTestId('GanttTarget__target-progress')).toBeInTheDocument()
    })

    test('should expand all', () => {
        render(<GanttTarget target = {target}/>)

        userEvent.click(screen.getByTestId('GanttTarget__expandAllButton_closed'))
        wait(800).then(() => {
            expect(screen.getByTestId('GanttTarget__expandAllButton_open')).toBeInTheDocument()
            expect(screen.getByTestId('GanttTarget__expandButton_open')).toBeInTheDocument()

            userEvent.click(screen.getByTestId('GanttTarget__expandAllButton_open'))
            expect(screen.getByTestId('GanttTarget__expandAllButton_closed')).toBeInTheDocument()
        })

    })
})