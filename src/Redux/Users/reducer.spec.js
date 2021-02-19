import { requestFetchInitUser } from '../Info/actions'
import * as reduxActions from './actions'
import reducer from './reducer'

const user = {
    id: 1,
    username: 'jsmith'
}

const userUpdated = {
    id: 1,
    username: 'yoda'
}


describe('User Reducer', () =>{

    it('Get One', () => {
        const actions = [{ type: reduxActions.requestFetchOneUser.fulfilled, payload: user }]
        const state = actions.reduce(reducer, {})
        expect(state[1]).toEqual(user)
    })

    it('Update', () => {
        const actions = [{ type: reduxActions.requestUpdateUser.fulfilled, payload: userUpdated }]
        const state = actions.reduce(reducer, user)
        expect(state[1]).toEqual(userUpdated)
    })

    it('Adds init logon user', () => {
        const actions = [{ type: requestFetchInitUser.fulfilled, payload: user }]
        const state = actions.reduce(reducer, {})
        expect(state[1]).toEqual(user)
    })

})