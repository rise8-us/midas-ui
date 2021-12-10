import React from 'react'
import {
    fireEvent, render, screen, selectRoadmapStatusesMock, useDispatchMock, useModuleMock
} from 'Utilities/test-utils'
import { ProductRoadmap } from './index'
import { sortProductRoadmapEntries } from './ProductRoadmap'

jest.mock('Components/RoadmapEntry/RoadmapEntry',
    () => (function testing() { return (<div>RoadmapEntry</div>) }))

describe('<ProductRoadmap />', () => {

    const selectRoadmapsByProductIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapsByProductId')
    const requestCreateRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestCreateRoadmap')

    const roadmapEntries = [
        {
            id: 3,
            title: 'title',
            description: 'description',
            index: 0,
            productId: 1,
            status: 'FUTURE',
            targetDate: '2021-08-01T00:00.000000'
        }
    ]

    beforeEach(() => {
        selectRoadmapStatusesMock()
        useDispatchMock().mockReturnValue({})
        selectRoadmapsByProductIdMock.mockReturnValue(roadmapEntries)
    })

    test('should render', () => {
        render(<ProductRoadmap productId = {1} hasEdit = {false}/>)

        expect(screen.getByText('RoadmapEntry')).toBeInTheDocument()
    })

    test('should not render add button without access', () => {
        render(<ProductRoadmap productId = {1} hasEdit = {false}/>)

        expect(screen.queryByTestId('ProductRoadmap__button-add')).not.toBeInTheDocument()
    })

    test('should create new RoadmapEntry', () => {
        render(<ProductRoadmap productId = {1} hasEdit/>)

        fireEvent.click(screen.getByTestId('ProductRoadmap__button-add'))

        expect(requestCreateRoadmapMock).toHaveBeenCalledTimes(1)
    })

    test('should handle sorting COMPLETE entries', () => {
        const entries = [
            { id: 1, status: 'COMPLETE', completedAt: '2021-01-02' },
            { id: 2, status: 'COMPLETE', completedAt: '2021-01-01' },
            { id: 3, status: 'COMPLETE', completedAt: '2021-01-03' }
        ]

        expect(sortProductRoadmapEntries(entries)).toEqual([
            { 'completedAt': '2021-01-03', 'id': 3, 'status': 'COMPLETE' },
            { 'completedAt': '2021-01-02', 'id': 1, 'status': 'COMPLETE' },
            { 'completedAt': '2021-01-01', 'id': 2, 'status': 'COMPLETE' }
        ])
    })

    test('should handle sorting IN_PROGRESS entries', () => {
        const entries = [
            { id: 4, status: 'IN_PROGRESS', dueDate: '2021-02-02' },
            { id: 5, status: 'IN_PROGRESS', dueDate: '2021-02-01' },
            { id: 6, status: 'IN_PROGRESS', dueDate: '2021-02-03' }
        ]

        expect(sortProductRoadmapEntries(entries)).toEqual([
            { 'dueDate': '2021-02-01', 'id': 5, 'status': 'IN_PROGRESS' },
            { 'dueDate': '2021-02-02', 'id': 4, 'status': 'IN_PROGRESS' },
            { 'dueDate': '2021-02-03', 'id': 6, 'status': 'IN_PROGRESS' }
        ])
    })

    test('should handle sorting FUTURE entries', () => {
        const entries = [
            { id: 4, status: 'FUTURE', dueDate: '2021-02-02' },
            { id: 5, status: 'FUTURE', dueDate: '2021-02-01' },
            { id: 6, status: 'FUTURE', dueDate: '2021-02-03' }
        ]

        expect(sortProductRoadmapEntries(entries)).toEqual([
            { 'dueDate': '2021-02-01', 'id': 5, 'status': 'FUTURE' },
            { 'dueDate': '2021-02-02', 'id': 4, 'status': 'FUTURE' },
            { 'dueDate': '2021-02-03', 'id': 6, 'status': 'FUTURE' }
        ])
    })
})