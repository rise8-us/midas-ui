import React from 'react'
import ProjectConstants from '../../../Redux/Projects/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Projects } from './index'

describe('<Projects>', () => {

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
        render(<Projects />)

        expect(screen.getByText('Add New Project')).toBeInTheDocument()
    })

    test('Add Project calls openPopup', () => {
        render(<Projects />)

        fireEvent.click(screen.getByText('Add New Project'))

        expect(openPopupMock).toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'CreateProjectPopup')
    })

})