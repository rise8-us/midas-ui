import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')

const mockState = {
    applications: {
        4: {
            id: 4,
            name: 'Midas Application',
            description: 'New Application',
            applicationsIds: [2,3],
            isArchived: false,
            portfolioId: 2,
            tagIds: [4]
        },
        5: {
            id: 5,
            name: 'Something Application',
            description: 'Something Application',
            applicationsIds: [1,3],
            isArchived: true,
            portfolioId: 4,
            tagIds: [2]
        },
    },
    tags: {
        4: {
            id: 4,
            label: 'Some tags',
            description: null,
            color: ''
        }
    }
}
    

test('getApplicationById - returns application object', () => {
    const returnedApplication = {
        ...mockState.applications[4],
    
    }
    const application = selectors.getApplicationById(mockState, 4)
    expect(application).toEqual(returnedApplication)
})

test('getApplicationById - returns empty object', () => {
    expect(selectors.getApplicationById(mockState, 2)).toBeInstanceOf(Object)
})

test('getApplications - returns application array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[4]])
    
    const applicationOne = {
            id: 4,
            name: 'Midas Application',
            description: 'New Application',
            applicationsIds: [2,3],
            isArchived: false,
            portfolioId: 2,
            tagIds: [4],
            tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const applications = selectors.getApplications(mockState)
    expect(applications[0]).toEqual(applicationOne)
})

test('getApplications - returns empty array', () => {
    expect(selectors.getApplications({})).toBeInstanceOf(Array)
})

test('getUnarchivedApplications - returns array with only unarchived applications', () => {
    expect(selectors.getUnarchivedApplications(mockState)).toHaveLength(1)
})