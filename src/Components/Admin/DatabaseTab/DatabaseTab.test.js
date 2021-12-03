import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { DatabaseTab } from './index'

describe('<DatabaseTab />', () => {

    const requestTakeBackupMock = useModuleMock('Redux/DatabaseActions/actions', 'requestTakeBackup')
    const requestRestoreMock = useModuleMock('Redux/DatabaseActions/actions', 'requestRestore')
    const requestDownloadBackupFileMock = useModuleMock('Redux/DatabaseActions/actions', 'requestDownloadBackupFile')

    beforeEach(() => {
        useDispatchMock()
            .mockResolvedValue({ type: '/', payload: ['backups/1738/file42.fun'] })
    })

    test('should take backup', () => {
        render(<DatabaseTab />)

        fireEvent.click(screen.getByTestId('DatabaseTab__backup-button'))

        waitForElementToBeRemoved(screen.getByTestId('DatabaseTab__waiting-icon'))

        expect(requestTakeBackupMock).toHaveBeenCalledTimes(1)
    })

    test('should take backup with filename provided', () => {
        render(<DatabaseTab />)

        userEvent.type(screen.getByTestId('DatabaseTab__take-backup-input'), 'Test{enter}')

        waitForElementToBeRemoved(screen.getByTestId('DatabaseTab__waiting-icon'))

        expect(requestTakeBackupMock).toHaveBeenCalledWith('Test')
    })

    test('should restore', async() => {
        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        fireEvent.click(screen.getByText('file42.fun'))
        fireEvent.click(screen.getByText('restore'))

        expect(requestRestoreMock).toHaveBeenCalledTimes(1)
    })

    test('should download backup', async() => {
        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        fireEvent.click(screen.getByText('file42.fun'))
        fireEvent.click(screen.getByText('download'))

        expect(requestDownloadBackupFileMock).toHaveBeenCalledTimes(1)
    })

    test('should handle errors', async() => {
        useDispatchMock().mockRejectedValue(['errors'])

        render(<DatabaseTab />)

        fireEvent.click(screen.getByTitle('Open'))
        await screen.findByText('Retrieving backups...')

        expect(screen.getByText('No backups retrieved.')).toBeInTheDocument()
        expect(screen.getByTestId('DatabaseTab__warning-icon')).toBeInTheDocument()
    })

})