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

    const defaultProps = {
        selectedDeliverableId: 2,
        portfolioId: 1
    }

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
    })

    test('should render with no edit', () => {
        render(<CapabilitiesView {...defaultProps}/>)

        expect(screen.getByText('DELIVERABLE PARENT TITLE')).toBeInTheDocument()
        expect(screen.queryByPlaceholderText('Link epics by title or product name')).not.toBeInTheDocument()
    })

    test('should render with edit', async() => {
        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: [] })
        })

        render(<CapabilitiesView hasEdit {...defaultProps}/>)

        expect(screen.getByPlaceholderText('Link epics by title or product name')).toBeInTheDocument()
    })

    test('should not render when selectedDeliverableId===null', () => {
        render(<CapabilitiesView portfolioId = {1}/>)

        expect(screen.queryByText('DELIVERABLE PARENT TITLE')).not.toBeInTheDocument()
    })

    test('should handle input selection : add new', async() => {
        render(<CapabilitiesView hasEdit {...defaultProps}/>)

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

        renderWithRouter(<CapabilitiesView hasEdit {...defaultProps}/>)

        userEvent.type(screen.getByPlaceholderText('Link epics by title or product name'), 'A')

        expect(enqueueMessageMock).toHaveBeenLastCalledWith({
            message: 'epic title is already tied to deliverable: deliverable parent title',
            severity: 'warning'
        })
    })

})