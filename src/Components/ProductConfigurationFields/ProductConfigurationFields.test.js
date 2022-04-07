import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductConfigurationFields } from './index'

describe('<ProductConfigurationFields />', () => {
    jest.setTimeout(60000)

    const sourceControl = { id: 10, name: 'source control' }
    const ProjectsByProductId = [{ id: 9, name: 'Micky', productId: 1 }]

    const allTags = [
        { id: 4, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' }
    ]

    const allTeams = [
        { id: 10, name: 'Bruins' },
        { id: 11, name: 'Trojans' }
    ]

    const allRoadmapTypes = {
        MANUAL: { name: 'MANUAL', displayName: 'Manual' },
        GITLAB: { name: 'GITLAB', displayName: 'GitLab Epic' }
    }

    const personnel = {
        ownerId: null,
        teamIds: [],
        adminIds: []
    }

    const ProjectsWithNoProductId = [
        { id: 10, name: 'Goofy', productId: null },
        { id: 11, name: 'Donald Duck', productId: null }
    ]

    const product = {
        id: 1,
        sourceControlId: null,
        gitlabGroupId: null,
        personnel,
        projectIds: [9],
        tags: [],
        roadmapType: 'MANUAL'
    }

    const selectRoadmapTypesMock = useModuleMock('Redux/AppSettings/selectors', 'selectRoadmapTypes')
    const selectAllTeamsMock = useModuleMock('Redux/Teams/selectors', 'selectAllTeams')
    const selectSourceControlsMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControls')
    const selectSourceControlByIdMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControlById')
    const selectProjectsByProductIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectsByProductId')
    const selectProjectsWithNoProductIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectsWithNoProductId')
    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')

    beforeEach(() => {
        selectRoadmapTypesMock.mockReturnValue(allRoadmapTypes)
        selectAllTeamsMock.mockReturnValue(allTeams)
        selectSourceControlByIdMock.mockReturnValue({})
        selectSourceControlsMock.mockReturnValue([sourceControl])
        selectProjectsByProductIdMock.mockReturnValue(ProjectsByProductId)
        selectProjectsWithNoProductIdMock.mockReturnValue(ProjectsWithNoProductId)
        selectTagsByTypesMock.mockReturnValue(allTags)
    })

    test('should render', () => {
        selectSourceControlByIdMock.mockReturnValue(sourceControl)

        render(<ProductConfigurationFields product = {product}/>)

        expect(screen.getByText('Team(s)')).toBeInTheDocument()
        expect(screen.getByText('Tag(s)')).toBeInTheDocument()
        expect(screen.getByText('Gitlab server')).toBeInTheDocument()
        expect(screen.getByText('Gitlab Group Id')).toBeInTheDocument()
        expect(screen.getByText('Gitlab Project(s)')).toBeInTheDocument()
    })

    test('should render errors', () => {
        render(<ProductConfigurationFields
            product = {product}
            errors = {[
                'Gitlab error',
                'Project with error'
            ]}
        />)

        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
        expect(screen.getByText('Project with error')).toBeInTheDocument()
    })

    test('should handle onChange functions', async() => {
        const mocks = {
            onGroupIdChange: jest.fn(),
            onProjectsChange: jest.fn(),
            onSourceControlChange: jest.fn(),
            onTagsChange: jest.fn(),
            onTeamsChange: jest.fn(),
            onRoadmapTypeChange: jest.fn()
        }

        render(<ProductConfigurationFields product = {product} {...mocks}/>)

        const gitlabGroupIdInput = screen.getByTestId('ProductConfigurationFields__input-gitlabGroupId')
        userEvent.clear(gitlabGroupIdInput)
        userEvent.type(gitlabGroupIdInput, '42')

        fireEvent.click(screen.getAllByTitle('Open')[0])
        fireEvent.click(await screen.findByText('Trojans'))

        fireEvent.click(screen.getAllByTitle('Open')[1])
        fireEvent.click(await screen.getByText('Tag 2'))

        fireEvent.click(screen.getAllByTitle('Open')[2])
        fireEvent.click(await screen.getByText('GitLab Epic'))

        fireEvent.click(screen.getAllByTitle('Open')[3])
        fireEvent.click(await screen.findByText('source control'))

        userEvent.click(screen.getByPlaceholderText('Projects that have CTF pipeline'))
        fireEvent.click(await screen.findByText('Goofy'))

        expect(mocks.onGroupIdChange).toHaveBeenCalled()
        expect(mocks.onProjectsChange).toHaveBeenCalled()
        expect(mocks.onSourceControlChange).toHaveBeenCalled()
        expect(mocks.onTagsChange).toHaveBeenCalled()
        expect(mocks.onTeamsChange).toHaveBeenCalled()

    })

    test('should render default team', async() => {
        useDispatchMock().mockResolvedValue({ payload: [allTeams[0]] })
        const newPersonnel = {
            ownerId: 100,
            teamIds: [9],
            adminIds: []
        }
        render(<ProductConfigurationFields product = {{ ...product, personnel: newPersonnel }}/>)

        expect(await screen.findByText(allTeams[0].name)).toBeInTheDocument()
    })

    test('should create a new project if not exist', async() => {
        useDispatchMock().mockResolvedValue({ payload: { id: 31, name: 'yolo' } })

        render(<ProductConfigurationFields product = {product}/>)

        userEvent.type(screen.getByPlaceholderText('Projects that have CTF pipeline'), 'yolo')
        fireEvent.click(await screen.findByText('Add "yolo"'))

        expect(await screen.findByText('yolo')).toBeInTheDocument()
    })

    test('should remove project', async() => {
        render(<ProductConfigurationFields product = {product}/>)

        fireEvent.click(await screen.findByTestId('CancelIcon'))

        expect(screen.queryByText('Micky')).not.toBeInTheDocument()
    })

    test('should strikethrough archived projects', () => {
        selectProjectsByProductIdMock.mockReturnValue([{ ...ProjectsByProductId[0], isArchived: true }])

        render(<ProductConfigurationFields product = {product}/>)

        expect(screen.getByTestId('ProductConfigurationFields__project-tag-0'))
            .toHaveStyle('textDecorationLine: line-through')
    })

})
