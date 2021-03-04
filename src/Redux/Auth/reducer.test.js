import { requestFetchInitUser } from '../Info/actions'
import reducer from './reducer'

const user = {
    id: 0,
    username: 'fbar',
    displayName: 'foo Bar',
    email: 'fbar@a.b',
    roles: 2
}

describe('Auth Reducer', () => {

    it('sets regular user', () => {
        const actions = [{ type: requestFetchInitUser.fulfilled, payload: user }]
        const state = actions.reduce(reducer, {})
        expect(state.user).toEqual(user)
        expect(state.isAdmin).toBeFalsy()
    })

    it('sets admin user', () => {
        const adminUser = { ...user, roles: 3 }
        const actions = [{ type: requestFetchInitUser.fulfilled, payload: adminUser }]
        const state = actions.reduce(reducer, {})
        expect(state.user).toEqual(adminUser)
        expect(state.isAdmin).toBeTruthy()
    })

})