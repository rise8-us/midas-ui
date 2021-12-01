import React from 'react'
import RoadmapContants from 'Redux/Roadmaps/constants'
import {
    fireEvent, render, screen, selectRoadmapStatusesMock, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { RoadmapEntry } from './index'
import { getDate, getStatusIcon, getVisibilityIcon } from './RoadmapEntry'

describe('<RoadmapEntry />', () => {

    const selectRoadmapByIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapById')
    const requestHideRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestHideRoadmap')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    const roadmapEntry = {
        id: 3,
        title: 'title',
        description: 'description',
        index: 0,
        productId: 1,
        status: 'FUTURE',
        dueDate: '2021-08-01T00:00.000000',
        isHidden: false
    }

    const roadmapEntryHidden = { ...roadmapEntry, status: 'COMPLETE', isHidden: true }

    beforeEach(() => {
        selectRoadmapByIdMock.mockReturnValue(roadmapEntry)
        selectRoadmapStatusesMock()
        useDispatchMock().mockReturnValue({})
        openPopupMock.mockReset()
    })

    test('should render', () => {
        render(<RoadmapEntry id = {3} hasEdit = {false}/>)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()
        expect(screen.getByText(/Aug 2021/i)).toBeInTheDocument()
    })

    test('should not call openPopup with no access', () => {
        render(<RoadmapEntry id = {3} hasEdit = {false}/>)

        fireEvent.click(screen.getByTestId('RoadmapEntry__grid-wrap'))

        expect(openPopupMock).toHaveBeenCalledTimes(0)
        expect(screen.queryByTestId('VisibilityOutlinedIcon')).not.toBeInTheDocument()
        expect(screen.queryByTestId('VisibilityOffOutlinedIcon')).not.toBeInTheDocument()
    })

    test('should call openPopup with access', () => {
        render(<RoadmapEntry id = {3} hasEdit = {true}/>)

        fireEvent.click(screen.getByTestId('RoadmapEntry__grid-wrap'))

        expect(openPopupMock).toHaveBeenCalledWith(
            RoadmapContants.UPDATE_ROADMAP, 'RoadmapEntryPopup', { id: 3, productId: 1 }
        )
    })

    test('should call requestHideRoadmap with access', () => {
        selectRoadmapByIdMock.mockReturnValue(roadmapEntryHidden)
        render(<RoadmapEntry id = {3} hasEdit = {true}/>)

        userEvent.hover(screen.getByTestId('RoadmapEntry__grid-wrap'))
        fireEvent.click(screen.getByTitle('show/hide'))

        expect(requestHideRoadmapMock).toHaveBeenCalledWith({ id: 3, isHidden: !roadmapEntryHidden.isHidden })

        expect(screen.getByTestId('VisibilityOffOutlinedIcon')).toBeInTheDocument()
    })

    test('should return empty div', () => {
        selectRoadmapByIdMock.mockReturnValue(roadmapEntryHidden)

        const { container } = render(<RoadmapEntry id = {3} hasEdit = {false}/>)

        expect(container).toBeEmptyDOMElement()
    })

    test('getDate: COMPLETE & populated', () => {
        const entry = { status: 'COMPLETE', completedAt: '2021-08-01T00:00.000000' }

        expect(getDate(entry)).toEqual(['2021', '08', '01'])
    })

    test('getDate: not COMPLETE & unpopulated', () => {
        const entry = { status: 'noop' }

        expect(getDate(entry)).toBeNull()
    })

    describe('getVisibilityIcon', () => {
        test('hidden === true', () => {
            render(getVisibilityIcon(true))

            expect(screen.getByTestId('VisibilityOutlinedIcon')).toBeInTheDocument()
        })

        test('hidden === false', () => {
            render(getVisibilityIcon(false))

            expect(screen.getByTestId('VisibilityOffOutlinedIcon')).toBeInTheDocument()
        })
    })

    describe('getStatusIcon', () => {
        test('hidden === true', () => {
            render(getStatusIcon(true, 'noop'))

            expect(screen.getByTestId('VisibilityOffOutlinedIcon')).toBeInTheDocument()
        })

        test('status === COMPLETE', () => {
            render(getStatusIcon(false, 'COMPLETE'))

            expect(screen.getByTestId('EventAvailableOutlinedIcon')).toBeInTheDocument()
        })

        test('status === IN_PROGRESS', () => {
            render(getStatusIcon(false, 'IN_PROGRESS'))

            expect(screen.getByTestId('EventOutlinedIcon')).toBeInTheDocument()
        })

        test('status === FUTURE', () => {
            render(getStatusIcon(false, 'FUTURE'))

            expect(screen.getByTestId('EventBusyOutlinedIcon')).toBeInTheDocument()
        })

        test('status === unknown', () => {
            const { container } = render(getStatusIcon(false, 'idk'))

            expect(container.firstChild).toBeNull()
        })
    })
})