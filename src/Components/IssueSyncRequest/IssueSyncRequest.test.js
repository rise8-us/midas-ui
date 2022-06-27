import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { IssueSyncRequest } from './index'

describe('<SyncRequest />', () => {

    const selectIssueSyncProgressMock = useModuleMock('Redux/AppSettings/selectors', 'selectIssueSyncProgress')
    const releaseSyncProgressMock = useModuleMock('Redux/AppSettings/selectors', 'selectReleaseSyncProgress')

    const defaultProps = { projectId: 1, request: jest.fn(), tooltip: '' }

    beforeEach(() => {
        releaseSyncProgressMock.mockReturnValue({ value: 0, status: 'SYNCED' })
    })

    test('should render', () => {
        selectIssueSyncProgressMock.mockReturnValueOnce({ value: 0, status: 'SYNCED' })

        render(<IssueSyncRequest {...defaultProps}/>)

        expect(screen.getByTestId('SyncRequest__button-sync')).toBeInTheDocument()
    })

    test('should display Issue sync progress', async() => {
        const mockRequest = jest.fn()
        selectIssueSyncProgressMock
            .mockReturnValueOnce({ id: 1, value: 0, status: 'SYNCED' })
            .mockReturnValue({ id: 1, value: .9, status: 'SYNCING' })
        useDispatchMock().mockResolvedValue({})

        const { rerender } = render(<IssueSyncRequest {...defaultProps} request = {mockRequest} />)
        userEvent.click(await screen.findByTestId('SyncRequest__button-sync'))
        rerender(<IssueSyncRequest {...defaultProps}/>)

        const progressVal = screen.getByTestId('SyncRequest__CircularProgress').getAttribute('aria-valuenow')
        expect(progressVal).toEqual('90')
        expect(mockRequest).toHaveBeenCalledTimes(1)
    })

})