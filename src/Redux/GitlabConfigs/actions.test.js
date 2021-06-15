import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Config action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllGitlabConfigs : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllGitlabConfigs())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gitlabConfigs')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllGitlabConfigs.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllGitlabConfigs.fulfilled.toString())
    })

    test('requestFetchAllGitlabConfigs : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllGitlabConfigs())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllGitlabConfigs.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllGitlabConfigs.rejected.toString())
    })

    test('requestCreateGitlabConfig : fulfilled', async() => {
        const config = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateGitlabConfig(config))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gitlabConfigs')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(config)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateGitlabConfig.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateGitlabConfig.fulfilled.toString())
    })

    test('requestCreateGitlabConfig : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateGitlabConfig({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateGitlabConfig.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateGitlabConfig.rejected.toString())
    })

    test('requestUpdateGitlabConfig : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const config = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateGitlabConfig(config))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gitlabConfigs/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateGitlabConfig.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateGitlabConfig.fulfilled.toString())
    })

    test('requestUpdateGitlabConfig : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateGitlabConfig())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateGitlabConfig.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateGitlabConfig.rejected.toString())
    })

})
