import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { DatabaseTab } from './index'

describe('<DatabaseTab />', () => {
    jest.setTimeout(30000)

    const requestTakeBackupMock = useModuleMock('Redux/DatabaseActions/actions', 'requestTakeBackup')
    const requestRestoreMock = useModuleMock('Redux/DatabaseActions/actions', 'requestRestore')
    const requestDownloadBackupFileMock = useModuleMock('Redux/DatabaseActions/actions', 'requestDownloadBackupFile')
    const requestGetBackupListMock = useModuleMock('Redux/DatabaseActions/actions', 'requestGetBackupList')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: ['backups/1738/file42.fun'] })
    })

    test('should take backup with no filename provided', () => {
        render(<DatabaseTab />)

        fireEvent.click(screen.getByTestId('DatabaseTab__backup-button'))
        waitForElementToBeRemoved(screen.getByTestId('DatabaseTab__waiting-icon'))

        expect(requestTakeBackupMock).toHaveBeenCalledWith(null)
    })

    test('should take backup with filename provided', () => {
        render(<DatabaseTab />)

        userEvent.type(screen.getByTestId('DatabaseTab__take-backup-input'), 'Test{enter}')
        waitForElementToBeRemoved(screen.getByTestId('DatabaseTab__waiting-icon'))

        expect(requestTakeBackupMock).toHaveBeenCalledWith('Test')
    })

    test('should restore', async() => {
        waitFor(() => {
            requestGetBackupListMock.mockResolvedValue([])
        })

        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        fireEvent.click(await screen.findByText('file42.fun'))
        fireEvent.click(screen.getByText('restore'))
        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(requestRestoreMock).toHaveBeenCalledTimes(1)
    })

    test('should cancel restore', async() => {
        waitFor(() => {
            requestGetBackupListMock.mockResolvedValue([])
        })

        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        fireEvent.click(await screen.findByText('file42.fun'))
        fireEvent.click(screen.getByText('restore'))
        fireEvent.click(screen.getByTestId('Popup__button-cancel'))

        expect(requestRestoreMock).toHaveBeenCalledTimes(0)
    })

    test('should download backup', async() => {
        waitFor(() => {
            requestGetBackupListMock.mockResolvedValue([])
        })

        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        fireEvent.click(await screen.findByText('file42.fun'))
        fireEvent.click(screen.getByText('download'))

        expect(requestDownloadBackupFileMock).toHaveBeenCalledTimes(1)
    })

    test('should handle errors', async() => {
        waitFor(() => {
            requestGetBackupListMock.mockResolvedValue([])
        })

        useDispatchMock().mockRejectedValue(['errors'])

        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        expect(await screen.findByText('No backups retrieved.')).toBeInTheDocument()
        expect(screen.getByTestId('DatabaseTab__warning-icon')).toBeInTheDocument()
    })

})