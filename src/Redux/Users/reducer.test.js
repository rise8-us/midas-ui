import { requestFetchInitUser } from '../Info/actions'
import * as reduxActions from './actions'
import reducer from './reducer'

const user = {
    id: 1,
    username: 'jsmith',
    roles: 0
}

const userUpdated = {
    id: 1,
    username: 'yoda'
}

const userRolesUpdated = {
    ...user,
    roles: 1
}

describe('User Reducer', () =>{

    it('Get One', () => {
        const actions = [{ type: reduxActions.requestFetchOneUser.fulfilled, payload: user }]
        const state = actions.reduce(reducer, {})
        expect(state[1]).toEqual(user)
    })

    it('Update User', () => {
        const actions = [{ type: reduxActions.requestUpdateUser.fulfilled, payload: userUpdated }]
        const state = actions.reduce(reducer, user)
        expect(state[1]).toEqual(userUpdated)
    })

    it('Update User Roles', () => {
        const actions = [{ type: reduxActions.requestUpdateUserRoles.fulfilled, payload: userRolesUpdated }]
        const state = actions.reduce(reducer, user)
        expect(state[1]).toEqual(userRolesUpdated)
    })

    it('Adds init logon user', () => {
        const actions = [{ type: requestFetchInitUser.fulfilled, payload: user }]
        const state = actions.reduce(reducer, {})
        expect(state[1]).toEqual(user)
    })

})