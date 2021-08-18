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

    test('should filter results', () => {
        render(<Projects />, { initialState: { filters: { appBar: { filterString: 'project' } } } })
        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should filter out results', () => {
        render(<Projects />, { initialState: { filters: { appBar: { filterString: 'nope' } } } })
        expect(screen.queryByText('project 1')).not.toBeInTheDocument()
    })

    test('Add Project calls openPopup', () => {
        render(<Projects />)

        fireEvent.click(screen.getByTitle(/add/i))

        expect(openPopupMock).toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'ProjectPopup')
    })

})