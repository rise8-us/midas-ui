import ProjectConstants from 'Redux/Projects/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from 'Utilities/test-utils'
import { ProjectsTab } from './index'

describe('<ProjectsTab />', () => {

    const allProjects = {
        id: 0,
        name: 'Project Test',
        description: 'desc 1',
        projectJourneyMap: 1,
        gitlabProjectId: 1234567,
        tagIds: [1],
        isArchived: false,
        tags: [
            { id: 1,
                label: 'Tag Test',
                description: null,
                color: ''
            }
        ]
    }

    const selectAllProjectsMock = useModuleMock('Redux/Projects/selectors', 'selectProjects')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const archiveProjectMock = useModuleMock('Redux/Tags/actions', 'requestArchiveProject')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllProjectsMock.mockReturnValue([allProjects])
    })

    test('Table display correctly', () => {
        render(<ProjectsTab  />)

        expect(screen.getByText('Tags')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('GitLab Project Id')).toBeInTheDocument()
        expect(screen.getByText('Project Test')).toBeInTheDocument()
        expect(screen.getByText('desc 1')).toBeInTheDocument()
        expect(screen.getByText('Tag Test')).toBeInTheDocument()
        expect(screen.getByText('1234567')).toBeInTheDocument()
    })

    test('Should fire updateProjectPopup', () => {
        render(<ProjectsTab />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProjectConstants.UPDATE_PROJECT, 'ProjectPopup', { id: allProjects.id })
    })

    test('Should fire archive tag', () => {
        render(<ProjectsTab />)

        fireEvent.click(screen.getByTitle('archive'))

        waitFor(() => expect(archiveProjectMock).toHaveBeenCalledWith(allProjects.id, true))
    })

    test('Should fire unarchive tag', () => {
        selectAllProjectsMock.mockReturnValue([{ ...allProjects, isArchived: true }])
        render(<ProjectsTab />)

        fireEvent.click(screen.getByTitle('unarchive'))

        waitFor(() => expect(archiveProjectMock).toHaveBeenCalledWith(allProjects.id, false))
    })

    test('Add Project calls openPopup', () => {
        render(<ProjectsTab />)

        fireEvent.click(screen.getByText('Add New Project'))

        expect(openPopupMock).toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'ProjectPopup')
    })

})