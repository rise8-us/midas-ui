import React from 'react'
import RoadmapContants from 'Redux/Roadmaps/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { RoadmapEntryPopup } from './index'

describe('<RoadmapEntryPopup />', () => {
    jest.setTimeout(10000)

    const selectRoadmapByIdMock = useModuleMock('Redux/Roadmaps/selectors', 'selectRoadmapById')
    const requestCreateRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestCreateRoadmap')
    const requestUpdateRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestUpdateRoadmap')
    const requestDeleteRoadmapMock = useModuleMock('Redux/Roadmaps/actions', 'requestDeleteRoadmap')
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    const existingRoadmap = {
        id: 3,
        title: 'title',
        description: 'description',
        index: 0,
        productId: 1,
        status: 'FUTURE',
        targetDate: '2021-08-01T00:00.000000'
    }

    const newRoadmap = {
        title: '',
        description: '',
        status: 'FUTURE',
        index: 0
    }

    beforeEach(() => {
        selectRoadmapByIdMock.mockReturnValue(newRoadmap)
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        render(<RoadmapEntryPopup index = {0} productId = {1}/>)

        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Start Date')).toBeInTheDocument()
        expect(screen.getByText('Due Date')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()
    })

    test('should fire closePopup', () => {
        render(<RoadmapEntryPopup index = {0} productId = {1}/>)

        fireEvent.click(screen.getByTestId('Popup__button-cancel'))

        expect(closePopupMock).toHaveBeenCalledWith(RoadmapContants.CREATE_ROADMAP)
    })

    test('should fire requestCreate', () => {
        render(<RoadmapEntryPopup index = {0} productId = {1}/>)

        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(requestCreateRoadmapMock).toHaveBeenCalledWith({
            index: 0,
            productId: 1,
            title: '',
            description: '',
            status: 'FUTURE',
            startDate: null,
            dueDate: null,
        })
    })

    test.skip('should edits and update request', () => {
        selectRoadmapByIdMock.mockReturnValue(existingRoadmap)

        render(<RoadmapEntryPopup id = {3} index = {0} productId = {1}/>)

        userEvent.type(screen.getByDisplayValue('title'), 'name')
        userEvent.type(screen.getByDisplayValue('description'), 'info')
        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('IN PROGRESS'))
        userEvent.click(screen.getByTestId('RoadmapEntryPopup__input-target-date'))
        // fireEvent.change(screen.getByDisplayValue('2021-08'), { target: { value: '2021-12' } })
        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(requestUpdateRoadmapMock).toHaveBeenCalledWith({
            id: 3,
            index: 0,
            productId: 1,
            title: 'titlename',
            description: 'descriptioninfo',
            status: 'IN_PROGRESS',
            startDate: '2021-12',
            dueDate: '2021-12'
        })
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'roadmaps/createOne': [
                    'title error',
                ]
            }
        }
        render(<RoadmapEntryPopup index = {0} productId = {1}/>, { initialState: state })

        expect(screen.getByText('title error')).toBeInTheDocument()
    })

    test('should handle cancel delete request', () => {
        selectRoadmapByIdMock.mockReturnValue(existingRoadmap)

        render(<RoadmapEntryPopup id = {3} index = {0} productId = {1}/>)

        fireEvent.click(screen.getByText('DELETE THIS ROADMAP ENTRY'))

        expect(screen.getByText('You are about to delete \'title\''))

        fireEvent.click(screen.getAllByText('cancel')[1])
        expect(screen.queryByText('You are about to delete \'title\'')).not.toBeInTheDocument()
    })

    test('should handle delete request', () => {
        selectRoadmapByIdMock.mockReturnValue(existingRoadmap)

        render(<RoadmapEntryPopup id = {3} index = {0} productId = {1}/>)

        fireEvent.click(screen.getByText('DELETE THIS ROADMAP ENTRY'))

        expect(screen.getByText('You are about to delete \'title\''))

        fireEvent.click(screen.getByText('confirm'))
        expect(requestDeleteRoadmapMock).toHaveBeenCalledWith(3)
    })
})