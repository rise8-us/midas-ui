import * as reduxActions from './actions'
import reducer from './reducer'

const allConfigsResponse = [
    {
        id: 4,
        name: 'New Config',
        description: 'IL2',
        baseUrl: 'http://foo.bar'
    },
    {
        id: 5,
        name: 'New Config2',
        description: 'IL4',
        baseUrl: 'http://foo.bar.baz'
    }
]

const updatedConfig = { id: 4, name: 'P1 IL2' }

describe('Configs Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all configs', () => {
        const actions = [{ type: reduxActions.requestFetchAllGitlabConfigs.fulfilled, payload: allConfigsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[4]).toEqual(allConfigsResponse[0])
        expect(state[5]).toEqual(allConfigsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Config', () => {
        const actions = [{ type: reduxActions.requestCreateGitlabConfig.fulfilled, payload: allConfigsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 4: allConfigsResponse[0] })
    })

    test('Update Config', () => {
        const actions = [{ type: reduxActions.requestUpdateGitlabConfig.fulfilled, payload: updatedConfig }]
        const state = actions.reduce(reducer, { 4: allConfigsResponse[0] })
        expect(state).toEqual({ 4: updatedConfig })
    })

})