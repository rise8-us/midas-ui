import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { RoadmapEpic } from './index'

describe('<RoadmapEpic />', () => {

    const selectRoadmapStatusesMock = useModuleMock('Redux/AppSettings/selectors', 'selectRoadmapStatuses')
    const selectEpicByIdMock = useModuleMock('Redux/Epics/selectors', 'selectEpicById')
    const requestHideEpicMock = useModuleMock('Redux/Epics/actions', 'requestHideEpic')

    const epic = {
        id: 3,
        title: 'title',
        description: 'description',
        productId: 1,
        state: 'opened'
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
        selectEpicByIdMock.mockReturnValue(epic)
        useDispatchMock().mockReturnValue({})
    })

    test('should render future with description', () => {
        render(<RoadmapEpic id = {3} />)
        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()

        fireEvent.mouseEnter(screen.getByTestId('RoadmapEpic__container'))
        expect(screen.getByText('gitlabLogo.svg')).toBeInTheDocument()
    })

    test('should render in progress with null description', () => {
        selectEpicByIdMock.mockReturnValue({ ...epic,
            description: null,
            startDate: '2021-09-01T00:00.000000',
            dueDate: '2021-10-01T00:00.000000'
        })

        render(<RoadmapEpic id = {3} hasEdit/>)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('No description present on GitLab Epic.')).toBeInTheDocument()
        expect(screen.getByText(/Oct 2021/i)).toBeInTheDocument()
    })

    test('should render complete with empty description', () => {
        selectEpicByIdMock.mockReturnValue({ ...epic,
            description: '',
            state: 'closed',
            closedAt: '2021-08-01T00:00.000000'
        })

        render(<RoadmapEpic id = {3} />)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('Empty first line in GitLab Epic description.')).toBeInTheDocument()
        expect(screen.getByText(/Aug 2021/i)).toBeInTheDocument()
    })

    test('should not render hidden epics without hasEdit', () => {
        selectEpicByIdMock.mockReturnValue({ ...epic, isHidden: true })

        render(<RoadmapEpic id = {3} />)

        expect(screen.queryByText('title')).not.toBeInTheDocument()
    })

    test('should render hidden epics with hasEdit', () => {
        selectEpicByIdMock.mockReturnValue({ ...epic, isHidden: true })

        render(<RoadmapEpic id = {3} hasEdit/>)
        expect(screen.getByText('title')).toBeInTheDocument()

        fireEvent.mouseEnter(screen.getByTestId('RoadmapEpic__container'))
        expect(screen.getByTestId('RoadmapEpic__is-hidden-icon')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('RoadmapEpic__visibility-button'))
        expect(requestHideEpicMock).toHaveBeenCalled()
    })

    test('should render with correct visibility icon', () => {
        render(<RoadmapEpic id = {3} hasEdit/>)
        expect(screen.getByText('title')).toBeInTheDocument()

        fireEvent.mouseEnter(screen.getByTestId('RoadmapEpic__container'))
        expect(screen.getByTestId('RoadmapEpic__is-not-hidden-icon')).toBeInTheDocument()

        fireEvent.mouseLeave(screen.getByTestId('RoadmapEpic__container'))
        expect(screen.getByTestId('RoadmapEpic__container')).toHaveProperty('style.border', '')
    })
})