import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { AssociateRequirementsPopup } from './index'


describe('<AssociateRequirementsPopup />', () => {

    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')
    const selectTargetByIdMock =
        useModuleMock('Redux/Targets/selectors', 'selectTargetById')

    const foundCapabilities = [
        {
            title: 'Capability 1',
            deliverableIds: [2, 3]
        }
    ]

    const foundDeliverables = [
        {
            id: 2,
            title: 'Deliverable 1.1'
        },
        {
            id: 3,
            title: 'Deliverable 1.2'
        },
        {
            id: 4,
            title: 'Deliverable 2.1'
        }
    ]

    const foundTarget = {
        id: 1,
        deliverableIds: [3, 4]
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectDeliverablesByCapabilityIdMock.mockReturnValue(foundDeliverables)
        selectTargetByIdMock.mockReturnValue(foundTarget)
    })

    test('should render', () => {
        render(<AssociateRequirementsPopup id = {1} capabilities = {foundCapabilities} target = {foundTarget}/>)

        expect(screen.getByText('Associate Requirements to Target')).toBeInTheDocument()
        expect(screen.getByText('Capability 1')).toBeInTheDocument()
        expect(screen.getByText('Deliverable 1.1')).toBeInTheDocument()
        expect(screen.getByText('Deliverable 1.2')).toBeInTheDocument()
        expect(screen.getByText('Deliverable 2.1')).toBeInTheDocument()

        expect(screen.getByTestId('Popup__button-submit')).toBeInTheDocument()
    })

    test('should check already connected deliverables', () => {
        render(<AssociateRequirementsPopup id = {1} capabilities = {foundCapabilities} target = {foundTarget} />)

        expect(screen.getByTestId('AssociateRequirementsPopup__checkbox-0')).not.toHaveClass('Mui-checked')
        expect(screen.getByTestId('AssociateRequirementsPopup__checkbox-1')).toHaveClass('Mui-checked')
        expect(screen.getByTestId('AssociateRequirementsPopup__checkbox-2')).toHaveClass('Mui-checked')
    })
})