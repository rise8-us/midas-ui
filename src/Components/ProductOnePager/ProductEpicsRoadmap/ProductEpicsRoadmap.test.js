import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductEpicsRoadmap } from './index'

jest.mock('Components/Epics/RoadmapEpic/RoadmapEpic',
    () => function testing() { return (<div>RoadmapEpic</div>) })

describe('<ProductEpicsRoadmap />', () => {

    const selectRoadmapStatusesMock = useModuleMock('Redux/AppSettings/selectors', 'selectRoadmapStatuses')
    const selectEpicsByProductIdMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByProductId')
    const requestSyncEpicsByProductIdMock = useModuleMock('Redux/Epics/actions', 'requestSyncEpicsByProductId')

    const epics = [
        {
            id: 3,
            title: 'opened',
            description: 'description',
            productId: 1,
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
        selectRoadmapStatusesMock.mockReturnValue({
            FUTURE: {
                name: 'FUTURE',
                label: 'Future',
                color: '#000000'
            },
            COMPLETE: {
                name: 'COMPLETE',
                label: 'Complete',
                color: '#000000'
            }
        })
        selectEpicsByProductIdMock.mockReturnValue(epics)
        useDispatchMock().mockReturnValue({})
    })

    test('should sort epics and render', () => {
        render(<ProductEpicsRoadmap productId = {1} hasEdit = {false}/>)

        const renderedEpics = screen.getAllByText('RoadmapEpic')
        expect(renderedEpics[0].title == 'closed 1')
        expect(renderedEpics[1].title == 'closed 2')
        expect(renderedEpics[2].title == 'opened')

        expect(screen.queryByTestId('ProductEpicsRoadmap__button-sync')).not.toBeInTheDocument()
    })

    test('should call requestSyncEpicsByProductId', () => {
        requestSyncEpicsByProductIdMock.mockReturnValue({})

        render(<ProductEpicsRoadmap productId = {1} hasEdit = {true}/>)

        fireEvent.click(screen.getByTestId('ProductEpicsRoadmap__button-sync'))

        expect(requestSyncEpicsByProductIdMock).toHaveBeenCalled()
    })
})