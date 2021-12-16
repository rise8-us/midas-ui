import React from 'react'
import { act, fireEvent, render, screen, useDispatchMock, useModuleMock, useSelectorMock } from 'Utilities/test-utils'
import { SnackbarManager } from './index'

describe('<SnackbarManager />', () => {
    jest.setTimeout('30000')

    const removeMessageMock = useModuleMock('Redux/Snackbar/reducer', 'removeMessage')

    const basicMessage = {
        id: '12345',
        message: 'message text',
        severity: 'info',
        timeout: 2000
    }

    const persistMessage = {
        ...basicMessage,
        persist: true
    }

    const customMessage = {
        ...basicMessage,
        customComponent: 'FeedbackMessage',
        severity: 'bogus',
        customProps: {
            link: 'https://www.google.com'
        }
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    test('should render', () => {
        render(<SnackbarManager />)

        expect(screen.getByTestId('SnackbarManager__snackbar')).toBeInTheDocument()
    })

    test('should show message in DOM then remove it', async() => {
        useSelectorMock()
            .mockReturnValueOnce([basicMessage])
            .mockReturnValue([])

        render(<SnackbarManager />)

        expect(removeMessageMock).toHaveBeenCalledTimes(1)
        expect(await screen.findByText('message text')).toBeInTheDocument()
        expect(screen.getByTestId('SnackbarManager__message-0-open')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(2000)
        })

        expect(await screen.findByTestId('SnackbarManager__message-0-closing')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(600)
        })

        expect(screen.queryByText('message text')).not.toBeInTheDocument()
    })

    test('should not remove persist msg from DOM until clicked', async() => {
        useSelectorMock()
            .mockReturnValueOnce([persistMessage])
            .mockReturnValue([])

        render(<SnackbarManager />)

        expect(screen.getByTestId('SnackbarManager__message-0-open')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(2000)
        })

        expect(screen.getByTestId('SnackbarManager__message-0-open')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('SnackbarManager__message-close-btn'))

        act(() => {
            jest.advanceTimersByTime(600)
        })

        expect(screen.queryByText('message text')).not.toBeInTheDocument()
    })

    test('should handle custom messages', async() => {
        useSelectorMock()
            .mockReturnValueOnce([customMessage])
            .mockReturnValue([])

        render(<SnackbarManager />)

        expect(await screen.findByText('message text')).toBeInTheDocument()
        expect(screen.getByTestId('SnackbarManager__message-0-open')).toHaveStyle('background-color: #c3c3c3')
        expect(screen.getByTestId('FeedbackIcon')).toBeInTheDocument()
    })

})
