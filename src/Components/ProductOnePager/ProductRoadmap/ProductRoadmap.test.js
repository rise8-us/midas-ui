import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductRoadmap } from './index'

jest.mock('Components/RoadmapEntry/RoadmapEntry',
    () => function testing() { return (<div>RoadmapEntry</div>) })

describe('<ProductRoadmap />', () => {

    const selectRoadmapStatusesMock = useModuleMock('Redux/AppSettings/selectors', 'selectRoadmapStatuses')
    const selectRoadmapsByProductIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapsByProductId')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    const roadmapEntry = {
        id: 3,
        title: 'title',
        description: 'description',
        index: 0,
        productId: 1,
        status: 'FUTURE',
        targetDate: '2021-08-01T00:00.000000'
    }

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
        selectRoadmapsByProductIdMock.mockReturnValue([roadmapEntry])
        useDispatchMock().mockReturnValue({})
        openPopupMock.mockReset()
    })

    test('should render', () => {
        render(<ProductRoadmap productId = {1} hasEdit = {false}/>)

        expect(screen.getByText('RoadmapEntry')).toBeInTheDocument()
    })

    test('should call openPopup with access', () => {
        render(<ProductRoadmap productId = {1} hasEdit = {true}/>)

        fireEvent.click(screen.getByTestId('ProductRoadmap__button-add'))

        expect(openPopupMock).toHaveBeenCalled()
    })

    test('should not render add button without access', () => {
        render(<ProductRoadmap productId = {1} hasEdit = {false}/>)

        expect(screen.queryByTestId('ProductRoadmap__button-add')).not.toBeInTheDocument()
    })
})