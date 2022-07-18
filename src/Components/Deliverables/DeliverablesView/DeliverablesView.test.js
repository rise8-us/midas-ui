import {
    mockSearchEpicsComponent, render, renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { DeliverablesView } from './index'

jest.mock('Components/Search/SearchEpics/SearchEpics', () => function testing({ onChange }) {
    return mockSearchEpicsComponent({ onChange })
})

describe('<DeliverablesView>', () => {
    const selectDeliverableByIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableById')
    const selectDeliverableByParentIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableByParentId')
    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

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
        selectEpicsByIdsMock.mockReturnValue([])
    })

    test('should render with no edit', () => {
        render(<DeliverablesView {...defaultProps}/>)

        expect(screen.getByText('DELIVERABLE PARENT TITLE')).toBeInTheDocument()
        expect(screen.queryByText('Associate Epics')).not.toBeInTheDocument()
    })

    test('should render with edit', async() => {
        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: [] })
        })

        render(<DeliverablesView hasEdit {...defaultProps}/>)

        expect(screen.getByText('Associate Epics')).toBeInTheDocument()
    })

    test('should not render when selectedDeliverableId===null', () => {
        render(<DeliverablesView portfolioId = {1}/>)

        expect(screen.queryByText('DELIVERABLE PARENT TITLE')).not.toBeInTheDocument()
    })

    test('should show correct progrss percentage', () => {
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

        selectEpicsByIdsMock.mockReturnValue([
            {
                title: 'subtargetEpicTitle',
                totalWeight: 10,
                completedWeight: 3
            }
        ])

        renderWithRouter(<DeliverablesView hasEdit {...defaultProps}/>)

        expect(screen.getByText('25%')).toBeInTheDocument()
    })

    test('should handle input selection', () => {
        render(<DeliverablesView hasEdit {...defaultProps}/>)

        userEvent.click(screen.getByText('Associate Epics'))
    })

})