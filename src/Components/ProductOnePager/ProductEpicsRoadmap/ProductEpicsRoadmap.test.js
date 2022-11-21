import {
    fireEvent,
    mockSyncRequest,
    render,
    screen,
    selectRoadmapStatusesMock,
    useDispatchMock,
    useModuleMock
} from 'Utilities/test-utils'
import { ProductEpicsRoadmap } from './index'
import { sortProductEpics } from './ProductEpicsRoadmap'

jest.mock('Components/Epics/RoadmapEpic/RoadmapEpic',
    () => function testing() { return (<div>RoadmapEpic</div>) })

jest.mock('Components/EpicSyncRequest/EpicSyncRequest', () => function testing(props) {
    return mockSyncRequest(props)
})

describe('<ProductEpicsRoadmap />', () => {

    const selectEpicsByProductIdMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByProductId')
    const requestSyncEpicsByProductIdMock = useModuleMock('Redux/Epics/actions', 'requestSyncEpicsByProductId')

    const epics = [
        {
            id: 3,
            title: 'opened 1',
            description: 'description',
            productId: 1,
            startDate: '2021-10-01',
            state: 'opened'
        }, {
            id: 4,
            title: 'closed 1',
            description: 'description',
            productId: 1,
            state: 'closed',
            closedAt: '2021-08-01T00:00.000000'
        }, {
            id: 5,
            title: 'closed 2',
            description: 'description',
            productId: 1,
            state: 'closed',
            closedAt: '2021-09-01T00:00.000000'
        },
        {
            id: 6,
            title: 'opened 2',
            description: 'description',
            productId: 1,
            startDate: null,
            state: 'opened',
        }
    ]

    beforeEach(() => {
        selectEpicsByProductIdMock.mockReturnValue(epics)
        selectRoadmapStatusesMock()
        useDispatchMock().mockReturnValue({})
    })

    test('should render all epics', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {false}/>)

        const renderedEpics = screen.getAllByText('RoadmapEpic')
        expect(renderedEpics.length).toEqual(4)

        expect(screen.queryByTestId('mockSyncRequest__sync-button')).not.toBeInTheDocument()
    })

    describe('sortProductEpics', () => {
        test('should sort closed products', () => {
            const correctOrder = [epics[1], epics[2]]

            expect(sortProductEpics([epics[2], epics[1]])).toEqual(correctOrder)
        })

        test('should sort opened products', () => {
            const correctOrder = [epics[3], epics[0]]

            expect(sortProductEpics([epics[0], epics[3]])).toEqual(correctOrder)
        })

        test('should sort all epics', () => {
            const correctOrder = [epics[3], epics[0], epics[1], epics[2]]

            expect(sortProductEpics(epics)).toEqual(correctOrder)
        })
    })

    test('sync icon is visible', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {true} />)

        expect(screen.getByTestId('mockSyncRequest__sync-button')).toBeInTheDocument()
    })

    test('sync icon is visible', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {true} />)

        fireEvent.click(screen.getByTestId('mockSyncRequest__sync-button'))

        expect(requestSyncEpicsByProductIdMock).toHaveBeenCalledWith(1)
    })
})
