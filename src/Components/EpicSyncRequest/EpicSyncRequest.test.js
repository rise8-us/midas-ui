import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { EpicSyncRequest } from './index'

describe('<EpicSyncRequest />', () => {

    const selectEpicSyncProgressMock = useModuleMock('Redux/AppSettings/selectors', 'selectEpicSyncProgress')

    const defaultProps = { tooltip: '', request: jest.fn(), id: 1 }

    test('should render', () => {
        selectEpicSyncProgressMock.mockReturnValueOnce({ value: 0, status: 'SYNCED' })

        render(<EpicSyncRequest {...defaultProps} />)

        expect(screen.getByTestId('SyncRequest__button-sync')).toBeInTheDocument()
    })

    test('should display epic sync progress', async() => {
        selectEpicSyncProgressMock
            .mockReturnValueOnce({ id: 1, value: 0, status: 'SYNCED' })
            .mockReturnValue({ id: 1, value: .9, status: 'SYNCING' })
        useDispatchMock().mockResolvedValue({})

        const { rerender } = render(<EpicSyncRequest {...defaultProps} />)
        rerender(<EpicSyncRequest {...defaultProps}/>)

        const progressVal = screen.getByTestId('SyncRequest__CircularProgress').getAttribute('aria-valuenow')
        expect(progressVal).toEqual('90')
    })

    test('should dispatch request when clicked', async() => {
        const mockRequest = jest.fn()
        const dispatchMock = useDispatchMock()
        selectEpicSyncProgressMock.mockReturnValueOnce({ value: 0, status: 'SYNCED' })
        dispatchMock.mockResolvedValue({})
        render(<EpicSyncRequest {...defaultProps} request = { mockRequest }/>)

        userEvent.click(screen.getByTestId('SyncRequest__button-sync'))
        expect(mockRequest).toHaveBeenCalledWith(1)
        expect(dispatchMock).toHaveBeenCalledTimes(2)
    })
})
