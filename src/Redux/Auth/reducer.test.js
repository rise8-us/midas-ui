import { requestFetchInit } from '../Init/actions'
import reducer from './reducer'

const user = {
    id: 0,
    username: 'fbar',
    displayName: 'foo Bar',
    email: 'fbar@a.b',
    roles: 2
}

test('sets regular user', () => {
    const actions = [{ type: requestFetchInit.fulfilled, payload: { userLoggedIn: user } }]
    const state = actions.reduce(reducer, {})
    expect(state.user).toEqual(user)
    expect(state.isAdmin).toBeFalsy()
})

test('sets admin user', () => {
    const adminUser = { ...user, roles: 3 }
    const actions = [{ type: requestFetchInit.fulfilled, payload: { userLoggedIn: adminUser } }]
    const state = actions.reduce(reducer, {})
    expect(state.user).toEqual(adminUser)
    expect(state.isAdmin).toBeTruthy()
})
