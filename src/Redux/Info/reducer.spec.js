import * as reduxActions from './actions'
import reducer from './reducer'

const infoPublic = {
    roles: [{
        name: 'ADMIN'
    }],
    classification: {
        backgroundColor: 'purple',
        textColor: 'white',
        label: 'UNCLASSIFIED',
        caveats: 'IL2'
    }
}


const mockStore = {
    roles: {},
    classification: {}
}
describe('Info Reducer', () => {

    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            classification: { },
            roles: { }
        })
    })

    it('fetches public info', () => {
        const actions = [{ type: reduxActions.requestFetchInitInfo.fulfilled, payload: infoPublic }]
        const state = actions.reduce(reducer, mockStore)

        expect(state.classification).toEqual(infoPublic.classification)
        expect(state.roles.ADMIN).toEqual(infoPublic.roles[0])
    })
})