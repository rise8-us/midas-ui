import React from 'react'
import { render, screen, useDispatchMock, useModuleMock, userEvent, waitFor } from 'Utilities/test-utils'
import { Capability } from './index'

describe('<Capability />', () => {
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')
    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')
    const requestCreateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestCreateCapability')
    const requestDeleteCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestDeleteCapability')
    const requestUpdateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestUpdateCapability')
    const requestDeleteDeliverableMock = useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    const selectCapabilityPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectCapabilityPageSettings')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')

    const defaultProps = {
        title: 'title',
        id: 1,
        deliverableIds: [2]
    }

    const deliverable = {
        title: 'deliverable',
        id: 2,
        capabilityId: 1
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectCapabilityByIdMock.mockReturnValue({ ...defaultProps, description: '' })
        selectDeliverablesByCapabilityIdMock.mockReturnValue([deliverable])
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: 2 })
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
    })

    test('should render', () => {
        selectCapabilityByIdMock.mockReturnValue({ ...defaultProps, description: 'description' })
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)

        render(<Capability id = {1}/>)

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description')).toBeInTheDocument()
    })

    test('should create new', () => {
        selectCapabilityByIdMock.mockReturnValue({ title: '', description: '', deliverableIds: [] })

        render(<Capability/>)

        userEvent.type(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT'), 'foobar')
        userEvent.tab()

        expect(requestCreateCapabilityMock).toHaveBeenCalledWith({
            title: 'foobar',
            description: '',
            referenceId: 0,
            deliverableIds: []
        })
    })

    test('should update title', () => {
        render(<Capability id = {1}/>)

        userEvent.type(screen.getByDisplayValue('title'), 'new title')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({
            id: 1,
            title: 'new title',
            description: '',
            referenceId: 0,
            deliverableIds: [2]
        })
    })

    test('should update description', () => {
        render(<Capability id = {1}/>)

        userEvent.type(screen.getByPlaceholderText('Enter Operational Context'), 'description')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({
            id: 1,
            title: 'title',
            description: 'description',
            referenceId: 0,
            deliverableIds: [2]
        })
    })

    test('should handle delete', async() => {
        render(<Capability id = {1}/>)

        userEvent.hover(screen.getByDisplayValue('title'))
        userEvent.click(screen.getByTestId('DeleteOutlineIcon'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledWith(2)
        await waitFor(() => expect(requestDeleteCapabilityMock).toHaveBeenCalledWith(1))
    })
})