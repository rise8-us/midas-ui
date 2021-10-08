import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DatabaseTab } from './index'

describe('<DatabaseTab />', () => {

    const requestGetBackupAsStringMock = useModuleMock('Redux/DatabaseActions/actions', 'requestGetBackupAsString')
    const requestPostBackupAsJsonMock = useModuleMock('Redux/DatabaseActions/actions', 'requestPostBackupAsJson')

    test('should get backup as string', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: 'mysql db dump' })

        render(<DatabaseTab />)

        fireEvent.click(screen.getByText(/retrieve backup/i))

        expect(requestGetBackupAsStringMock).toHaveBeenCalledTimes(1)
        expect(await screen.findByText('mysql db dump')).toBeInTheDocument()
    })

    test('should render no authd user', () => {
        useDispatchMock().mockReturnValue({})

        render(<DatabaseTab />)

        userEvent.type(screen.getByPlaceholderText('PLACE BACKUP TEXT HERE'), 'backup string')
        fireEvent.click(screen.getByText(/upload backup/i))

        expect(requestPostBackupAsJsonMock).toHaveBeenCalledTimes(1)
        expect(requestPostBackupAsJsonMock).toHaveBeenCalledWith('backup string')
    })

})