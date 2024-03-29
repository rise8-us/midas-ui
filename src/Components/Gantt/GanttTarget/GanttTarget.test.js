import { wait } from '@testing-library/user-event/dist/utils'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttTarget } from './index'

describe('<GanttTarget />', () => {
    const target1 = {
        id: 1,
        title: 'This is the target title1',
        startDate: '2022-04-30',
        dueDate: '2022-05-01',
        description: 'These are the details',
        childrenIds: [],
        portfolioId: 1,
    }
    const target2 = {
        id: 1,
        title: 'This is the target title2',
        startDate: '2021-02-31',
        dueDate: '2022-04-30',
        description: 'These are the details',
        childrenIds: [],
        portfolioId: 1,
    }
    const target3 = {
        id: 1,
        title: 'This is the target title3',
        startDate: '2022-04-31',
        dueDate: '2023-04-30',
        description: 'These are the details',
        childrenIds: [],
        portfolioId: 1,
    }
    const target4 = {
        id: 1,
        title: 'This is the target title4',
        startDate: '2021-05-31',
        dueDate: '2023-04-30',
        description: 'These are the details',
        childrenIds: [],
        portfolioId: 1,
    }
    const newSubTarget = {
        title: 'Enter subtarget title',
        parentId: 1,
        portfolioId: 1,
        startDate: '2022-04-30',
        dueDate: '2022-05-01',
    }

    const dateRange = [new Date(2022, 0, 1), new Date(2022, 5, 1)]

    const defaultProps = {
        target: target1,
        dateRange
    }

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

    test('should render within dateRange', () => {
        render(<GanttTarget {...defaultProps}/>)

        expect(screen.getByText('This is the target title1')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttTarget__target-progress')).not.toBeInTheDocument()
    })

    test('should render out of startRange', () => {
        render(<GanttTarget target = {target2} dateRange = {dateRange} />)

        expect(screen.getByText('This is the target title2')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttTarget__target-progress')).not.toBeInTheDocument()
    })

    test('shouild render out of endRange', () => {
        render(<GanttTarget target = {target3} dateRange = {dateRange} />)

        expect(screen.getByText('This is the target title3')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttTarget__target-progress')).not.toBeInTheDocument()
    })

    test('should render outside of start and end ranges', () => {
        render(<GanttTarget target = {target4} dateRange = {dateRange} />)

        expect(screen.getByText('This is the target title4')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttTarget__target-progress')).not.toBeInTheDocument()
    })

    test('should handle onEditClick', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttTarget {...defaultProps}/>)

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

        render(<GanttTarget {...defaultProps}/>)

        userEvent.click(screen.getByTestId('GanttActionButtons__delete'))

        expect(openPopupMock).toHaveBeenCalledWith(
            'target/delete',
            'DeletePopup',
            expect.objectContaining({
                id: 1,
                constant: 'target/delete',
                title: 'This is the target title1',
                type: undefined
            })
        )
    })

    test('should render description after expansion', async() => {
        const testExpand = jest.fn()
        render(<GanttTarget {...defaultProps} setIsExpanded = {testExpand}/>)

        userEvent.click(screen.getByTestId('GanttTarget__expandButton_closed'))
        wait(800).then(() => {
            expect(testExpand).toBeCalledTimes(1)
        })
    })

    test('should send request to add SubTarget', () => {
        const requestCreateTargetMock = useModuleMock('Redux/Targets/actions', 'requestCreateTarget')
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        useDispatchMock()

        render(<GanttTarget {...defaultProps}/>)

        userEvent.click(screen.getByTestId('GanttTarget__createSubTarget_button'))

        expect(requestCreateTargetMock).toHaveBeenCalledWith(newSubTarget)
    })

    test('should expand all', () => {
        render(<GanttTarget {...defaultProps}/>)

        userEvent.click(screen.getByTestId('GanttTarget__expandAllButton_closed'))
        wait(800).then(() => {
            expect(screen.getByTestId('GanttTarget__expandAllButton_open')).toBeInTheDocument()
            expect(screen.getByTestId('GanttTarget__expandButton_open')).toBeInTheDocument()

            userEvent.click(screen.getByTestId('GanttTarget__expandAllButton_open'))
            expect(screen.getByTestId('GanttTarget__expandAllButton_closed')).toBeInTheDocument()
        })
    })
})
