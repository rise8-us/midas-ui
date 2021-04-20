import React from 'react'
import ProjectConstants from '../../../Redux/Projects/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Projects } from './index'

describe('<Projects>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectUnarchivedProjectsMock = useModuleMock('Redux/Projects/selectors', 'selectUnarchivedProjects')
    const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')

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
        selectUnarchivedProjectsMock.mockReturnValue([projects])
        selectProjectByIdMock.mockReturnValue(project)
    })

    test('Has correct text', () => {
        render(<Projects />)

        expect(screen.getByText('Add New Project')).toBeInTheDocument()
    })

    test('Add Project calls openPopup', () => {
        render(<Projects />)

        fireEvent.click(screen.getByText('Add New Project'))

        expect(openPopupMock).toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'CreateOrUpdateProjectPopup')
    })

})