import App from './App'
import { render, useModuleMock, waitFor } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => function testing() { return (<div/>) })
jest.mock('./Components/WebsocketProvider/WebsocketProvider', () => function testing() {  return (<div/>) })
jest.mock('Hooks/useHistory', () => () => ({
    listen: jest.fn()
}))

describe('<App />', () => {

    const initializeAppMock = useModuleMock('Utilities/initializeApp', 'initializeApp')
    const setInitializedMock = useModuleMock('Redux/AppSettings/reducer', 'setInitialized')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    test('Has correct text', () => {
        initializeAppMock.mockResolvedValue()
        selectUserLoggedInMock.mockReturnValue({ isAdmin: true })

        render(<App />)

        expect(setInitializedMock).not.toHaveBeenCalled()
    })

    test('Init fetch fails throws error', async() => {
        initializeAppMock.mockImplementation(() => Promise.reject('failed'))
        selectUserLoggedInMock.mockReturnValue({ isAdmin: false })

        render(<App />)

        await waitFor(() => {
            expect(setInitializedMock).toHaveBeenCalledWith(false)
        })
    })
})
