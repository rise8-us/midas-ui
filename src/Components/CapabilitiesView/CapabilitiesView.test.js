import React from 'react'
import {
    mockSearchEpicsComponent, render, renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { CapabilitiesView } from './index'

jest.mock('Components/Search/SearchEpics/SearchEpics', () => function testing({ onChange }) {
    return mockSearchEpicsComponent({ onChange })
})

describe('<CapabilitiesView>', () => {
    const selectDeliverableByIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableById')
    const selectDeliverableByParentIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableByParentId')
    const requestCreateDeliverableMock = useModuleMock('Redux/Deliverables/actions', 'requestCreateDeliverable')
    const enqueueMessageMock = useModuleMock('Redux/Snackbar/reducer', 'enqueueMessage')

    const selectCapabilityPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectCapabilityPageSettings')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ data: { } })
        selectDeliverableByIdMock.mockReturnValue({
            title: 'deliverable parent title',
            children: [],
            completion: {
                gitlabEpic: {
                    id: 20
                }
            }
        })
        selectDeliverableByParentIdMock.mockReturnValue([])
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: 2 })
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)
    })

    test('should render with no edit', () => {
        render(<CapabilitiesView />)

        expect(screen.getByText('DELIVERABLE PARENT TITLE')).toBeInTheDocument()
        expect(screen.queryByPlaceholderText('Link epics by title or product name')).not.toBeInTheDocument()
    })

    test('should render with edit', async() => {
        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: [] })
        })

        selectCapabilitiesPagePermissionMock.mockReturnValue(true)

        render(<CapabilitiesView />)

        expect(screen.getByPlaceholderText('Link epics by title or product name')).toBeInTheDocument()
    })

    test('should not render when selectedDeliverableId===null', () => {
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: null })

        render(<CapabilitiesView />)

        expect(screen.queryByText('DELIVERABLE PARENT TITLE')).not.toBeInTheDocument()
    })

    test('should handle input selection : add new', async() => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)

        render(<CapabilitiesView />)

        userEvent.type(screen.getByPlaceholderText('Link epics by title or product name'), 'A')

        expect(requestCreateDeliverableMock).toHaveBeenLastCalledWith({
            title: 'epic title',
            index: 0,
            productId: 11,
            completion: {
                gitlabEpicId: 20
            },
            parentId: 2,
            referenceId: 0
        })

        await waitFor(() => {
            expect(enqueueMessageMock).toHaveBeenLastCalledWith({
                message: 'Linked epic title to deliverable: deliverable parent title',
                severity: 'success'
            })
        })
    })

    test('should handle input selection : already exists', () => {
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
        selectDeliverableByParentIdMock.mockReturnValue([{
            title: 'epic title',
            productId: 1,
            id: 2,
            completion: {
                value: 2,
                target: 10,
                gitlabEpic: {
                    id: 20
                }
            }
        }])

        renderWithRouter(<CapabilitiesView />)

        userEvent.type(screen.getByPlaceholderText('Link epics by title or product name'), 'A')

        expect(enqueueMessageMock).toHaveBeenLastCalledWith({
            message: 'epic title is already tied to deliverable: deliverable parent title',
            severity: 'warning'
        })
    })

})