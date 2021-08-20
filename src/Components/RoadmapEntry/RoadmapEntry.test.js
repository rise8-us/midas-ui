import React from 'react'
import RoadmapContants from 'Redux/Roadmaps/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { RoadmapEntry } from './index'

describe('<RoadmapEntry />', () => {

    const selectRoadmapStatusesMock = useModuleMock('Redux/AppSettings/selectors', 'selectRoadmapStatuses')
    const selectRoadmapByIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapById')
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
        selectRoadmapByIdMock.mockReturnValue(roadmapEntry)
        useDispatchMock().mockReturnValue({})
        openPopupMock.mockReset()
    })

    test('should render', () => {
        selectRoadmapByIdMock.mockReturnValue({ ...roadmapEntry, status: 'COMPLETE' })

        render(<RoadmapEntry id = {3}/>)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()
        expect(screen.getByText(/Aug 2021/i)).toBeInTheDocument()
    })

    test('should call openPopup with access', () => {
        render(<RoadmapEntry id = {3} hasEditAccess/>)

        fireEvent.click(screen.getByText('title'))

        expect(openPopupMock).toHaveBeenCalledWith(
            RoadmapContants.UPDATE_ROADMAP, 'RoadmapEntryPopup', { id: 3, index: 0, productId: 1 }
        )
    })

    test('should not call openPopup with no access', () => {
        render(<RoadmapEntry id = {3}/>)

        fireEvent.click(screen.getByText('title'))

        expect(openPopupMock).toHaveBeenCalledTimes(0)
    })

})