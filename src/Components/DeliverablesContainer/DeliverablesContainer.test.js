import React from 'react'
import { act, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DeliverablesContainer } from './index'

describe('<DeliverablesContainer />', () => {

    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')
    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')
    const requestCreateDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestCreateDeliverable')
    const requestUpdateDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestUpdateDeliverable')
    const requestDeleteDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectDeliverablesByCapabilityIdMock.mockReturnValue([
            {
                assignedToId: null,
                capabilityId: 2,
                children: [],
                creationDate: '2022-01-19T13:39:01',
                epicId: null,
                id: 5,
                index: 0,
                isArchived: false,
                parentId: null,
                performanceMeasureId: null,
                productId: null,
                referenceId: 0,
                releaseIds: [],
                status: 'NOT_STARTED',
                title: 'Deliverable'
            }
        ])
    })

    test('should render', () => {
        render(<DeliverablesContainer capabilityId = {2}/>)
        expect(screen.getByText('Deliverable')).toBeInTheDocument()
    })

    test('should call dispatch to create deliverable', () => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer capabilityId = {2}/>)

        act(() => {
            userEvent.type(screen.getByPlaceholderText('Add new deliverable...'), 'DeliverableCreate{enter}')
        })

        expect(requestCreateDeliverableMock).toHaveBeenCalledTimes(1)
    })

    test('should call dispatch to update deliverable', () => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer capabilityId = {2}/>)

        act(() => {
            userEvent.type(screen.getByText('Deliverable'), 'DeliverableCreate{enter}')
        })

        expect(requestUpdateDeliverableMock).toHaveBeenCalledTimes(1)
    })

    test('should call dispatch to delete deliverable', () => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer capabilityId = {2}/>)

        act(() => {
            userEvent.click(screen.getByText('Deliverable'))
        })
        userEvent.click(screen.getByTestId('DraggableRow__button-delete'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledTimes(1)
    })

})