import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')

const mockState = {
    projects: {
        4: {
            id: 4,
            name: 'New Project',
            gitlabProjectId: null,
            description: null,
            tagIds: [1],
            isArchived: false,
            productId: null
        },
        5: {
            id: 5,
            name: 'New Project 2',
            description: 'whoa nelly',
            gitlabProjectId: 1234,
            tagIds: [1],
            isArchived: true,
            productId: 42
        }
    },
    tags: {
        1: {
            id: 1,
            label: 'Some tags',
            description: null,
            color: ''
        }
    }
}

test('selectProjectById - returns project object', () => {
    selectTagsByIdsMock.mockReturnValue([])
    const returnedProject = {
        ...mockState.projects[4],
        tags: []
    }
    const project = selectors.selectProjectById(mockState, 4)
    expect(project).toEqual({
        ...returnedProject,
        description: '',
        gitlabProjectId: ''
    })
})

test('selectProjectById - null id returns object with keys', () => {
    expect(selectors.selectProjectById(mockState, null)).toEqual({
        name: '',
        description: '',
        tags: [],
        gitlabProjectId: ''
    })
})

test('selectProjects - returns project array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[1]])

    const projectOne = {
        id: 4,
        name: 'New Project',
        gitlabProjectId: '',
        description: '',
        tagIds: [1],
        isArchived: false,
        productId: null,
        tags: [
            {   id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const projects = selectors.selectProjects(mockState)
    expect(projects[0]).toEqual(projectOne)
})

test('selectProjects - returns empty array', () => {
    expect(selectors.selectProjects({})).toBeInstanceOf(Array)
})

test('selectUnarchivedProjects - returns empty array', () => {
    expect(selectors.selectUnarchivedProjects(mockState)).toHaveLength(1)
})

test('selectProjectsWithNoProductId - returns array of one', () => {
    expect(selectors.selectProjectsWithNoProductId(mockState)).toHaveLength(1)
})

test('selectProjectsByProductId - return array', () => {
    expect(selectors.selectProjectsByProductId(mockState, 42)).toEqual([mockState.projects[5]])
})