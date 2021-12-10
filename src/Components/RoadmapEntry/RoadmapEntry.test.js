import React from 'react'
import {
    fireEvent, render, screen, selectRoadmapStatusesMock, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { RoadmapEntry } from './index'
import { getDate, getVisibilityIcon, StatusIcon } from './RoadmapEntry'

describe('<RoadmapEntry />', () => {

    const selectRoadmapByIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapById')
    const requestUpdateRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestUpdateRoadmap')
    const requestHideRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestHideRoadmap')
    const getTextWidthMock = useModuleMock('Utilities/textHelpers', 'getTextWidth')

    const roadmapEntry = {
        id: 3,
        title: 'title',
        description: 'description',
        index: 0,
        productId: 1,
        status: 'FUTURE',
        dueDate: '2021-08-01',
        isHidden: false
    }

    const roadmapEntryHidden = { ...roadmapEntry, status: 'COMPLETE', isHidden: true }

    beforeEach(() => {
        selectRoadmapByIdMock.mockReturnValue(roadmapEntry)
        selectRoadmapStatusesMock()
        useDispatchMock().mockReturnValue({})
        getTextWidthMock.mockReturnValue('100px')
    })

    test('should render', () => {
        render(<RoadmapEntry id = {3} hasEdit = {false}/>)

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description')).toBeInTheDocument()
        expect(screen.getByDisplayValue(/Aug 2021/i)).toBeInTheDocument()
    })

    test('should update roadmap title', () => {
        render(<RoadmapEntry id = {3} hasEdit/>)

        userEvent.type(screen.getByDisplayValue('title'), 'new title{enter}')

        expect(requestUpdateRoadmapMock).toBeCalledWith({ ...roadmapEntry, title: 'new title' })
    })

    test('should update roadmap date', () => {
        render(<RoadmapEntry id = {3} hasEdit/>)

        fireEvent.click(screen.getByDisplayValue(/Aug 2021/i))
        fireEvent.click(screen.getByLabelText('Next month'))
        fireEvent.click(screen.getByLabelText('Sep 1, 2021'))
        fireEvent.click(screen.getByText('OK'))

        expect(requestUpdateRoadmapMock).toBeCalledWith({ ...roadmapEntry, dueDate: '2021-09-01' })
    })

    test('should update roadmap status', async() => {
        render(<RoadmapEntry id = {3} hasEdit/>)

        userEvent.hover(screen.getByTestId('RoadmapEntry__status-icon'))
        fireEvent.click(await screen.findByText('Complete'))
        userEvent.unhover(screen.getByTestId('RoadmapEntry__grid-wrap'))

        expect(requestUpdateRoadmapMock).toBeCalledWith({ ...roadmapEntry, status: 'COMPLETE' })
    })

    test('should call requestHideRoadmap with access', () => {
        selectRoadmapByIdMock.mockReturnValue(roadmapEntryHidden)
        render(<RoadmapEntry id = {3} hasEdit = {true}/>)

        userEvent.hover(screen.getByTestId('RoadmapEntry__grid-wrap'))
        fireEvent.click(screen.getByTitle('show/hide'))

        expect(requestHideRoadmapMock).toHaveBeenCalledWith({ id: 3, isHidden: !roadmapEntryHidden.isHidden })

        expect(screen.getByTestId('VisibilityOffOutlinedIcon')).toBeInTheDocument()
    })

    test('getDate: COMPLETE & populated', () => {
        const entry = { status: 'COMPLETE', completedAt: '2021-08-01T00:00.000000' }

        expect(getDate(entry)).toEqual('2021-08-01')
    })

    test('getDate: not COMPLETE & unpopulated', () => {
        const entry = { status: 'noop' }

        expect(getDate(entry)).toBeUndefined()
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

    describe('StatusIcon', () => {
        test('newEntry === true', () => {
            render(<StatusIcon newEntry = {true} hidden = {false} status = 'noop' color = '#fff000'/>)

            expect(screen.getByTestId('WarningAmberRoundedIcon')).toBeInTheDocument()
        })

        test('hidden === true', () => {
            render(<StatusIcon newEntry = {false} hidden = {true} status = 'noop' color = '#fff000'/>)

            expect(screen.getByTestId('VisibilityOffOutlinedIcon')).toBeInTheDocument()
        })

        test('status === COMPLETE', () => {
            render(<StatusIcon newEntry = {false} hidden = {false} status = 'COMPLETE' color = '#fff000'/>)

            expect(screen.getByTestId('EventAvailableOutlinedIcon')).toBeInTheDocument()
        })

        test('status === IN_PROGRESS', () => {
            render(<StatusIcon newEntry = {false} hidden = {false} status = 'IN_PROGRESS' color = '#fff000'/>)

            expect(screen.getByTestId('EventOutlinedIcon')).toBeInTheDocument()
        })

        test('status === FUTURE', () => {
            render(<StatusIcon newEntry = {false} hidden = {false} status = 'FUTURE' color = '#fff000'/>)

            expect(screen.getByTestId('EventBusyOutlinedIcon')).toBeInTheDocument()
        })

        test('status === unknown', () => {
            const { container } = render(
                <StatusIcon newEntry = {false} hidden = {false} status = 'idk' color = '#fff000'/>
            )

            expect(container.firstChild).toBeNull()
        })
    })
})