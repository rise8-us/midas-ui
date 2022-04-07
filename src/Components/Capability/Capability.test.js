import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Capability } from './index'

describe('<Capability />', () => {
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')
    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')

    const selectCapabilityPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectCapabilityPageSettings')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')

    const foundCapability = {
        title: 'title',
        description: 'description',
        id: 1,
        deliverableIds: [2]
    }

    beforeEach(() => {
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: 2 })
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
    })

    test('should render existing capability', () => {
        selectCapabilityByIdMock.mockReturnValue(foundCapability)
        selectDeliverablesByCapabilityIdMock.mockReturnValue([])
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)
        useDispatchMock()

        render(<Capability id = {1}/>)

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description')).toBeInTheDocument()
    })

    test('should render new capability', () => {
        selectCapabilityByIdMock.mockReturnValue({ title: '', description: '', deliverableIds: [] })

        render(<Capability/>)

        expect(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT')).toBeInTheDocument()
        expect(screen.queryByTestId('CapabilityDescription')).not.toBeInTheDocument()
    })

})