import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttSubTarget } from './index'

describe('<GanttSubTarget />', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectCapabilitiesByPortfolioIdMock = useModuleMock('Redux/Capabilities/selectors',
        'selectCapabilitiesByPortfolioId')
    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')
    const selectTargetByIdMock = useModuleMock('Redux/Targets/selectors', 'selectTargetById')

    const subtargetWithReqs = {
        id: 1,
        title: 'This is the subTarget title',
        dueDate: '2022-06-01',
        startDate: '2022-01-01',
        description: 'These are the details',
        portfolioId: 1,
        deliverableIds: [2],
        epicIds: [],
        isPriority: false
    }

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectTargetByIdMock.mockReturnValue(subtargetWithReqs)
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: false })
        selectCapabilitiesByPortfolioIdMock.mockReturnValue([{
            id: 3,
            title: 'capability test'
        }])
        selectEpicsByIdsMock.mockReturnValue([])
    })

    test('should render', () => {
        render(<GanttSubTarget id = {1}/>)

        expect(screen.getByTitle('This is the subTarget title')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttSubTarget__associate-req')).not.toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttSubTarget__priority')).not.toBeInTheDocument()
    })

    test('should render with no description', () => {
        selectTargetByIdMock.mockReturnValue({ ...subtargetWithReqs, description: null })

        render(<GanttSubTarget id = {1}/>)

        expect(screen.queryByTestId('GanttSubTarget__description')).not.toBeInTheDocument()
    })

    test('associate req button', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttSubTarget id = {1} />)

        userEvent.click(screen.getByTestId('GanttSubTarget__associate-req'))
        expect(openPopupMock).toBeCalledWith(
            'target/update',
            'AssociateRequirementsPopup',
            {
                id: 1,
                capabilities: [{
                    id: 3,
                    title: 'capability test'
                }],
                target: {
                    id: 1,
                    title: 'This is the subTarget title',
                    dueDate: '2022-06-01',
                    startDate: '2022-01-01',
                    description: 'These are the details',
                    portfolioId: 1,
                    deliverableIds: [2],
                    epicIds: [],
                    isPriority: false
                }
            }
        )
    })

    test('should show with priority', () => {
        selectTargetByIdMock.mockReturnValue({ ...subtargetWithReqs, isPriority: true })

        render(<GanttSubTarget id = {1} />)

        expect(screen.getByTestId('GanttSubTarget__priority')).toBeInTheDocument()
    })

    test('should show priority button on edit', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        render(<GanttSubTarget id = {1} />)

        expect(screen.getByTestId('GanttSubTarget__priority')).toBeInTheDocument()
    })
})
