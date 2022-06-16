import * as selectors from './selectors'

describe('Release selectors', () => {

    const mockState = {
        releases: {
            1: {
                id: 1,
                name: 'Release 1',
                projectId: 4,
                releasedAt: new Date(2022, 6, 1)
            },
            2: {
                id: 2,
                name: 'Release 2',
                projectId: 4,
                releasedAt: new Date(2022, 5, 1)
            },
            3: {
                id: 3,
                name: 'Release 3',
                projectId: 5,
                releasedAt: new Date(2022, 6, 1)
            },
            4: {
                id: 4,
                name: 'Release 4',
                projectId: 5,
                releasedAt: new Date(2022, 3, 1)
            },
            5: {
                id: 5,
                name: 'Release 5',
                projectId: 5,
                releasedAt: new Date(2022, 2, 1)
            },
        },
    }

    const startDate =  new Date(2022, 5, 0)
    const endDate =  new Date(2022, 7, 0)

    test('selectReleaseInRangeAndProjectId - returns correct array', () => {
        expect(selectors.selectReleaseInRangeAndProjectId(mockState, [startDate, endDate], 4)).toHaveLength(2)
    })

    test('should selectReleaseClosestTo', () => {
        expect(selectors.selectReleaseClosestTo(mockState, new Date(2022, 4, 1), 5)).toEqual(mockState.releases[4])
    })
})
