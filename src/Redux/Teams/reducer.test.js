import * as reduxActions from './actions'
import reducer from './reducer'

const allTeamsResponse = [
    {
        id: 1,
        name: 'team1'
    }, {
        id: 2,
        name: 'team2'
    }
]

describe('Teams Reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('fetches all teams', () => {
        const actions = [{ type: reduxActions.requestFetchAllTeams.fulfilled, payload: allTeamsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allTeamsResponse[0])
        expect(state[2]).toEqual(allTeamsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    it('Create Team', () => {
        const actions = [{ type: reduxActions.requestCreateTeam.fulfilled, payload: allTeamsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allTeamsResponse[0] })
    })

    it('Update Team', () => {
        const actions = [{ type: reduxActions.requestUpdateTeam.fulfilled, payload: allTeamsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allTeamsResponse[0] })
    })
})