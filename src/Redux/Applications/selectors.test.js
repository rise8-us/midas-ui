import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')
const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')

const mockState = {
    applications: {
        4: {
            id: 4,
            name: 'Midas Application',
            description: 'New Application',
            projectIds: [2],
            isArchived: false,
            portfolioId: 2,
            tagIds: [7]
        },
        5: {
            id: 5,
            name: 'Something Application',
            description: 'Something Application',
            projectIds: [3],
            isArchived: true,
            portfolioId: 4,
            tagIds: [2]
        },
    },
    tags: {
        7: {
            id: 7,
            label: 'Some tags',
            description: null,
            color: ''
        }
    },
    projects: {
        2: {
            name: 'p2'
        },
        3: {
            name: 'p3'
        }
    }
}

afterEach(() => {
    selectTagsByIdsMock.mockClear()
    selectProjectByIdMock.mockClear()
})

test('selectApplicationById - returns application object', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[7]])
    selectProjectByIdMock.mockReturnValue(mockState.projects[2])

    const returnedApplication = {
        ...mockState.applications[4],
        tags: [{ ...mockState.tags[7] }],
        projects: [{ ...mockState.projects[2] }]

    }
    const application = selectors.selectApplicationById(mockState, 4)
    expect(application).toEqual(returnedApplication)
})

test('selectApplicationById - returns empty object', () => {
    expect(selectors.selectApplicationById(mockState, 2)).toBeInstanceOf(Object)
})

test('selectApplications - returns application array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[7]])

    const applicationOne = {
        id: 4,
        name: 'Midas Application',
        description: 'New Application',
        projectIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [7],
        tags: [
            {   id: 7,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const applications = selectors.selectApplications(mockState)
    expect(applications[0]).toEqual(applicationOne)
})

test('selectApplications - returns empty array', () => {
    expect(selectors.selectApplications({})).toBeInstanceOf(Array)
})

test('selectUnarchivedApplications - returns array with only unarchived applications', () => {
    expect(selectors.selectUnarchivedApplications(mockState)).toHaveLength(1)
})

test('selectUnarchivedApplicationIds - returns mockState.app[4]', () => {
    expect(selectors.selectUnarchivedApplicationIds(mockState)).toHaveLength(1)
    expect(selectors.selectUnarchivedApplicationIds(mockState)).toEqual([4])
})