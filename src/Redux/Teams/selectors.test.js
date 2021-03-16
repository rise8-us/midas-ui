import * as selectors from './selectors'

const mockState = {
    teams: {
        4: {
            id: 4,
            name: 'Team',
            gitlabGroupId: 1234
        }
    }
}

test('getTeamById - returns team object', () => {
    const team = selectors.getTeamById(mockState, 4)
    expect(team).toBe(mockState.teams[4])
})

test('getTeamById - returns empty object', () => {
    expect(selectors.getTeamById(mockState, 2)).toBeInstanceOf(Object)
})