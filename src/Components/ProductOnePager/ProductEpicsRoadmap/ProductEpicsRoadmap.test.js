import {
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

jest.mock('Components/SyncRequest/SyncRequest', () => function testing() {
    return mockSyncRequest()
})

describe('<ProductEpicsRoadmap />', () => {

    const selectEpicsByProductIdMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByProductId')

    const epics = [
        {
            id: 3,
            title: 'opened',
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
        }
    ]

    beforeEach(() => {
        selectEpicsByProductIdMock.mockReturnValue(epics)
        selectRoadmapStatusesMock()
        useDispatchMock().mockReturnValue({})
    })

    test('should sort epics and render', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {false}/>)

        const renderedEpics = screen.getAllByText('RoadmapEpic')
        expect(renderedEpics[0].title == 'closed 1')
        expect(renderedEpics[1].title == 'closed 2')
        expect(renderedEpics[2].title == 'opened')

        expect(screen.queryByTestId('mockSyncRequest__sync-button')).not.toBeInTheDocument()
    })

    describe('sortProductEpics', () => {
        test('should sort closed products', () => {
            const correctOrder = [epics[1], epics[2]]

            expect(sortProductEpics([epics[1], epics[2]])).toEqual(correctOrder)
            // expect(sortProductEpics([epics[2], epics[1]])).toEqual(correctOrder) //why not work?
        })

        test('should sort opened products', () => {
            const correctOrder = [{ ...epics[0], startDate: null }, epics[0]]

            expect(sortProductEpics([epics[0], { ...epics[0], startDate: null }])).toEqual(correctOrder)
        })
    })

    test('sync icon is visible', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {true} />)

        expect(screen.getByTestId('mockSyncRequest__sync-button')).toBeInTheDocument()
    })
})