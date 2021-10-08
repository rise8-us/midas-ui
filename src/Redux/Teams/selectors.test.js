import * as selectors from './selectors'

const mockState = {
    teams: {
        4: {
            id: 4,
            name: 'Team',
            gitlabGroupId: 1234,
            productIds: [2],
            userIds: [1]
        },
        7: {
            id: 7,
            name: 'Team',
            gitlabGroupId: 5678,
            productIds: [3],
            userIds: [2]
        }
    }
}

test('selectTeamById - returns team object', () => {
    const team = selectors.selectTeamById(mockState, 4)
    expect(team).toBe(mockState.teams[4])
})

test('selectTeamById - returns empty property object', () => {
    expect(selectors.selectTeamById(mockState, 2))
        .toEqual({
            name: '',
            gitlabGroupId: '',
            description: '',
            userIds: [],
            productManagerId: null,
            designerId: null,
            techLeadId: null,
        })
})

test('selectAllTeams - returns array of team objects', () => {
    const teams = selectors.selectAllTeams(mockState)
    expect(teams).toEqual([mockState.teams[4], mockState.teams[7]])
})

test('selectAllTeams - returns empty array', () => {
    expect(selectors.selectAllTeams({ teams: {} })).toEqual([])
})

test('selectTeamByProductId - returns object', () => {
    expect(selectors.selectTeamByProductId(mockState, 2)).toEqual(mockState.teams[4])
})

test('selectTeamByProductId - returns object with userIds', () => {
    expect(selectors.selectTeamByProductId(mockState, 0)).toEqual({ userIds: [] })
})