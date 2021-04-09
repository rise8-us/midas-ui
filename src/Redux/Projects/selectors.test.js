import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')

const mockState = {
    projects: {
        4: {
            id: 4,
            name: 'New Project',
            gitlabProjectId: 1234,
            tagIds: [1],
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

test('getProjectById - returns project object', () => {
    selectTagsByIdsMock.mockReturnValue([])
    const returnedProject = {
        ...mockState.projects[4],
        tags: []
    }
    const project = selectors.getProjectById(mockState, 4)
    expect(project).toEqual(returnedProject)
})

test('getProjectById - returns empty object', () => {
    expect(selectors.getProjectById(mockState, 2)).toBeInstanceOf(Object)
})

test('getProjects - returns project array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[1]])

    const projectOne = {
        id: 4,
        name: 'New Project',
        gitlabProjectId: 1234,
        tagIds: [1],
        tags: [
            {   id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const projects = selectors.getProjects(mockState)
    expect(projects[0]).toEqual(projectOne)
})

test('getProjects - returns empty array', () => {
    expect(selectors.getProjects({})).toBeInstanceOf(Array)
})