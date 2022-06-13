import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { SyncRequest } from './index'

describe('<SyncRequest />', () => {

    const requestSyncEpicsByProductIdMock = useModuleMock('Redux/Products/actions', 'requestSyncEpicsByProductId')
    const selectEpicSyncProgressMock = useModuleMock('Redux/AppSettings/reducer', 'selectEpicSyncProgress')

    test('should render', () => {
        const request = jest.fn()
        render(
            <SyncRequest
                id = {1}
                request = {request}
                tooltip = ''
            />
        )

        expect(screen.getByTestId('SyncRequest__button-sync')).toBeInTheDocument()
    })

    test('should display warning icon on error', async() => {
        useDispatchMock().mockReturnValueOnce({}).mockRejectedValue(['errors'])

        render(
            <SyncRequest
                id = {1}
                request = {requestSyncEpicsByProductIdMock}
                tooltip = ''
            />
        )

        userEvent.click(screen.getByTestId('SyncRequest__button-sync'))

        expect(await screen.findByTestId('SyncRequest__warning-icon')).toBeInTheDocument()
    })

    test('should display epic sync progress', async() => {
        const request = jest.fn()
        selectEpicSyncProgressMock.mockReturnValue({})
        useDispatchMock().mockResolvedValue({})
        render(<SyncRequest
            id = {1}
            request = {request}
            tooltip = ''
        />)

        userEvent.click(await screen.findByTestId('SyncRequest__button-sync'))

        const progressVal = screen.getByTestId('SyncRequest__CircularProgress').getAttribute('aria-valuenow')
        expect(progressVal).toEqual('100')
    })

})