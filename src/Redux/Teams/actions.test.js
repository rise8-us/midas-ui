import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Team action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllTeams : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllTeams())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/teams')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllTeams.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllTeams.fulfilled.toString())
    })

    test('requestFetchAllTeams : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllTeams())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllTeams.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllTeams.rejected.toString())
    })

    test('requestCreateTeam : fulfilled', async() => {
        const team = { name: 'starship9', gitlabGroupId: 1 }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateTeam(team))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/teams')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(team)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTeam.fulfilled.toString())
    })

    test('requestCreateTeam : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateTeam({ id: 1, name: 'starship9', gitlabGroupId: 1 }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTeam.rejected.toString())
    })

    test('requestUpdateTeam : fulfilled', async() => {
        const requestBody = { name: 'starship9', gitlabGroupId: 1 }
        const team = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateTeam(team))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/teams/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTeam.fulfilled.toString())
    })

    test('requestUpdateTeam : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateTeam({ id: 1, name: 'starship9', gitlabGroupId: 1 }))

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTeam.rejected.toString())
    })

    test('requestArchiveTeam : fulfilled', async() => {
        const requestBody = { id: 1, isArchived: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveTeam(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/teams/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveTeam.fulfilled.toString())
    })

    test('requestArchiveTeam : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveTeam())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveTeam.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveTeam.rejected.toString())
    })
})
