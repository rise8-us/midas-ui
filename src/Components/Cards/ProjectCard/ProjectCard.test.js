import React from 'react'
import ProjectConstants from '../../../Redux/Projects/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { ProjectCard } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe('<ProjectCard />', () => {

    const project = {
        id: 0,
        name: 'project 1',
        description: 'desc 1',
        projectJourneyMap: 1,
        tagIds: [1],
        productId: null,
        tags: [
            { id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const journeyMapUpdateMock = useModuleMock('Redux/Projects/actions', 'requestUpdateJourneyMapById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProjectByIdMock.mockReturnValue(project)
    })

    test('should display data', () => {
        render(<ProjectCard id = {project.id}/>)

        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should fire updateProjectPopup', () => {
        selectProjectByIdMock.mockReturnValue({ ...project, coverage: { coverageChange: 1 } })
        render(<ProjectCard id = {project.id}/>)

        fireEvent.click(screen.getByTestId('ProjectCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProjectConstants.UPDATE_PROJECT, 'CreateOrUpdateProjectPopup', { id: project.id })
    })

    test('should fire updateProgress forward', () => {
        selectProjectByIdMock.mockReturnValue({ ...project, coverage: { coverageChange: -1 } })
        render(<ProjectCard id = {project.id}/>)

        fireEvent.click(screen.getByTestId('ProjectCard__button-forward'))

        expect(journeyMapUpdateMock).toHaveBeenCalledTimes(1)
        expect(journeyMapUpdateMock.mock.calls[0][0]).toEqual({ id: 0, projectJourneyMap: 3 })
    })

    test('should fire updateProgress backward', () => {
        render(<ProjectCard id = {project.id}/>)

        fireEvent.click(screen.getByTestId('ProjectCard__button-back'))

        expect(journeyMapUpdateMock).toHaveBeenCalledTimes(1)
        expect(journeyMapUpdateMock.mock.calls[0][0]).toEqual({ id: 0, projectJourneyMap: 0 })
    })

    test('should go to product page on name click', () => {
        selectProjectByIdMock.mockReturnValue({ ...project, productId: 2 })

        render(<ProjectCard id = {project.id}/>)

        fireEvent.click(screen.getByText(/project 1/))
        expect(mockHistoryPush).toHaveBeenCalledWith('/products/2')

    })
})