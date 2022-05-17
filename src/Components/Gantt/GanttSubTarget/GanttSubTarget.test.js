import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttSubTarget } from './index'

describe('<GanttSubTarget />', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectCapabilitiesByPortfolioIdMock = useModuleMock('Redux/Capabilities/selectors',
        'selectCapabilitiesByPortfolioId')
    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

    const subtargetWithReqs = {
        id: 1,
        title: 'This is the subTarget title',
        dueDate: '2022-06-01',
        startDate: '2022-01-01',
        description: 'These are the details',
        portfolioId: 1,
        deliverableIds: [2],
        epicIds: []
    }

    const foundEpics = [
        { id: 1, name: 'alpha', title: 'foo', totalWeight: 0, completedWeight: 0 }
    ]

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: false })
        selectCapabilitiesByPortfolioIdMock.mockReturnValue([{
            id: 3,
            title: 'capability test'
        }])
        selectEpicsByIdsMock.mockReturnValue([])
    })

    test('should render', () => {
        render(<GanttSubTarget target = {subtargetWithReqs}/>)

        expect(screen.getByTitle('This is the subTarget title')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttSubTarget__associate-req')).not.toBeInTheDocument()
        expect(screen.getByText('No Epics linked')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
    })

    test('should render with no description', () => {
        render(<GanttSubTarget target = {{ ...subtargetWithReqs, description: null }}/>)

        expect(screen.getByText('No Description set.')).toBeInTheDocument()
    })

    test('associate req button', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        render(<GanttSubTarget target = {subtargetWithReqs} />)

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
                    epicIds: []
                }
            }
        )
    })

    test('should show progress bar', () => {
        selectEpicsByIdsMock.mockReturnValue(foundEpics)

        render(<GanttSubTarget target = {subtargetWithReqs}/>)

        expect(screen.getByTestId('GanttSubtarget__subtarget-progress')).toBeInTheDocument()
    })

})