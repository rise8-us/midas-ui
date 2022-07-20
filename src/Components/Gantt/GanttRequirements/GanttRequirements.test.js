import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttRequirements } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe('<GanttRequirements />', () => {

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    const selectCapabilityByIdMock =
        useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')

    const selectDeliverablesByIdsMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByIds')

    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')

    const allDeliverables = [
        {
            id: 2,
            title: 'Deliverable 1.1',
            capabilityId: 1
        },
        {
            id: 3,
            title: 'Deliverable 1.2',
            capabilityId: 1
        },
        {
            id: 4,
            title: 'Deliverable 2.1',
            capabilityId: 2
        }
    ]

    const selectedDeliverables = [
        {
            id: 2,
            title: 'Deliverable 1.1',
            capabilityId: 1
        },
        {
            id: 3,
            title: 'Deliverable 1.2',
            capabilityId: 1
        }
    ]

    const foundCapability = {
        id: 1,
        title: 'capability',
        deliverableIds: [2, 3]
    }

    const defaultProps = {
        deliverableIds: [2, 3],
        capabilityId: 2,
        portfolioId: 1,
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        selectCapabilityByIdMock.mockReturnValue(foundCapability)
        selectDeliverablesByCapabilityIdMock.mockReturnValue(allDeliverables)
        selectDeliverablesByIdsMock.mockReturnValue(selectedDeliverables)
    })

    test('should render', () => {
        render(<GanttRequirements {...defaultProps}/>)

        expect(screen.getByText('capability')).toBeInTheDocument()
    })

    test('should show deliverables on hover', async() => {
        render(<GanttRequirements {...defaultProps}/>)

        userEvent.hover(await screen.findByText('capability'))

        expect(await screen.findByTestId('GanttRequirements__deliverable-0')).toBeInTheDocument()
    })

    test('should route to requirement on click', async() => {
        render(<GanttRequirements {...defaultProps}/>)

        userEvent.click(await screen.findByText('capability'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios/1/requirements/2')
    })
})