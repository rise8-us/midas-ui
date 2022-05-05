import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttSubTarget } from './index'

describe('<GanttSubTarget />', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectCapabilitiesByPortfolioIdMock = useModuleMock('Redux/Capabilities/selectors',
        'selectCapabilitiesByPortfolioId')

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

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: false })
        selectCapabilitiesByPortfolioIdMock.mockReturnValue([{
            id: 3,
            title: 'capability test'
        }])
    })

    test('should render', () => {
        render(<GanttSubTarget target = {subtargetWithReqs}/>)

        expect(screen.getByTitle('This is the subTarget title')).toBeInTheDocument()
        expect(screen.queryByTestId('GanttSubTarget__associate-req')).not.toBeInTheDocument()
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

})