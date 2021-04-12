import React from 'react'
import ProjectConstants from '../../../Redux/Projects/constants'
import TagConstants from '../../../Redux/Tags/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const getUnarchivedProjectsMock = useModuleMock('Redux/Projects/selectors', 'getUnarchivedProjects')
    const getProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'getProjectById')

    const projects = {
        id: 0,
        name: 'project 1',
        description: 'desc 1',
        projectJourneyMap: 2,
        tagIds: [1],
    }

    const project = {
        id: 0,
        name: 'project 1',
        description: 'desc 1',
        projectJourneyMap: 2,
        tagIds: [1],
        tags: [
            { id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getUnarchivedProjectsMock.mockReturnValue([projects])
        getProjectByIdMock.mockReturnValue(project)
    })

    test('Has correct text', () => {
        render(<Home />)

        expect(screen.getByText('Add New Team')).toBeInTheDocument()
        expect(screen.getByText('Add New Project')).toBeInTheDocument()
        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
    })

    test('Add Team calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Team'))

        expect(openPopupMock).toHaveBeenCalledWith(TeamConstants.CREATE_TEAM, 'CreateTeamPopup')
    })

    test('Add Project calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Project'))

        expect(openPopupMock).toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'CreateProjectPopup')
    })

    test('Add Tag calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateTagPopup')
    })
})