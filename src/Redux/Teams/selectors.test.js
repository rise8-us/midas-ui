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

test('selectTeamById - returns team object', () => {
    const team = selectors.selectTeamById(mockState, 4)
    expect(team).toBe(mockState.teams[4])
})

test('selectTeamById - returns empty property object', () => {
    expect(selectors.selectTeamById(mockState, 2)).toEqual({ name: '', gitlabGroupId: '', description: '', })
})