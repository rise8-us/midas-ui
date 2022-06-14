import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { IssueSyncRequest } from './index'

describe('<SyncRequest />', () => {

    const requestSyncIssuesByProjectIdMock = useModuleMock('Redux/Projects/actions', 'requestSyncIssuesByProjectId')
    const selectIssueSyncProgressMock = useModuleMock('Redux/AppSettings/reducer', 'selectIssueSyncProgress')

    test('should render', () => {
        const request = jest.fn()
        render(
            <IssueSyncRequest
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
            <IssueSyncRequest
                id = {1}
                request = {requestSyncIssuesByProjectIdMock}
                tooltip = ''
            />
        )

        userEvent.click(screen.getByTestId('SyncRequest__button-sync'))

        expect(await screen.findByTestId('SyncRequest__warning-icon')).toBeInTheDocument()
    })

    test('should display Issue sync progress', async() => {
        const request = jest.fn()
        selectIssueSyncProgressMock.mockReturnValue({})
        useDispatchMock().mockResolvedValue({})
        render(<IssueSyncRequest
            id = {1}
            request = {request}
            tooltip = ''
        />)

        userEvent.click(await screen.findByTestId('SyncRequest__button-sync'))

        const progressVal = screen.getByTestId('SyncRequest__CircularProgress').getAttribute('aria-valuenow')
        expect(progressVal).toEqual('0')
    })

})