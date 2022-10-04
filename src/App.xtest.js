import App from './App'
import { render, useModuleMock, waitFor } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => function testing() { return (<div/>) })
jest.mock('./Components/WebsocketProvider/WebsocketProvider', () => function testing() {  return (<div/>) })
jest.mock('Hooks/useHistory', () => () => ({
    listen: jest.fn()
}))

/* TODO: This is breaking with a d3 export
   Recharts v2.1.14 has a breaking change that causes jest to not be able to render.
   Updatd file extension to .xtest.js so that the jest does not pick it up.  There is
   an active issue in their Github: https://github.com/recharts/recharts/issues/2991
   that is tracking this. Once it is resolved we should be able to remove the 'x' from
   the extension and re-introduce the test. 2022-10-04
*/
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
