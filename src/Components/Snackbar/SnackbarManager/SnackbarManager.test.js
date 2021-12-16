import React from 'react'
import { act, fireEvent, render, screen, useDispatchMock, useModuleMock, useSelectorMock } from 'Utilities/test-utils'
import { SnackbarManager } from './index'

describe('<SnackbarManager />', () => {
    jest.setTimeout('30000')

    const updateMessageMock = useModuleMock('Redux/Snackbar/reducer', 'updateMessage')
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
        updateMessageMock.mockReset()
    })

    test('should not render with 0 messages', () => {
        useSelectorMock().mockReturnValue([])

        render(<SnackbarManager />)

        expect(screen.queryByTestId('SnackbarManager__snackbar')).not.toBeInTheDocument()
    })

    test('should handle workflow', () => {
        useSelectorMock()
            .mockReturnValueOnce([{ ...basicMessage, open: undefined }])
            .mockReturnValueOnce([{ ...basicMessage, open: true }])
            .mockReturnValueOnce([{ ...basicMessage, open: false }])
            .mockReturnValue([])

        render(<SnackbarManager />)

        expect(updateMessageMock).toHaveBeenCalledTimes(1)

        act(() => {
            jest.advanceTimersByTime(2000)
        })

        expect(updateMessageMock).toHaveBeenCalledTimes(2)

        act(() => {
            jest.advanceTimersByTime(700)
        })

        expect(removeMessageMock).toHaveBeenCalledTimes(1)
    })

    test('should render message with open===true', () => {
        useSelectorMock().mockReturnValueOnce([{ ...basicMessage, open: true }])

        render(<SnackbarManager />)

        expect(screen.getByTestId('SnackbarManager__message-0-open')).toBeInTheDocument()
        expect(screen.getByText('message text')).toBeInTheDocument()
    })

    test('should render message open===false', () => {
        useSelectorMock().mockReturnValueOnce([{ ...basicMessage, open: false }])

        render(<SnackbarManager />)

        expect(screen.getByTestId('SnackbarManager__message-0-closing')).toBeInTheDocument()
        expect(screen.getByText('message text')).toBeInTheDocument()
    })

    test('should not remove persist msg from DOM until clicked', () => {
        useSelectorMock()
            .mockReturnValueOnce([persistMessage])
            .mockReturnValueOnce([{ ...persistMessage, open: true }])

        const { rerender } = render(<SnackbarManager />)

        expect(updateMessageMock).toHaveBeenCalledTimes(1)

        act(() => {
            jest.advanceTimersByTime(2000)
        })

        rerender(<SnackbarManager />)
        useSelectorMock().mockReturnValue([])

        expect(updateMessageMock).not.toHaveBeenCalledTimes(2)

        fireEvent.click(screen.getByTestId('SnackbarManager__message-close-btn'))

        expect(updateMessageMock).toHaveBeenCalledTimes(2)

        act(() => {
            jest.advanceTimersByTime(700)
        })

        expect(removeMessageMock).toHaveBeenCalledTimes(1)

        rerender(<SnackbarManager />)
        expect(screen.queryByText('message text')).not.toBeInTheDocument()
    })

    test('should handle custom messages', async() => {
        useSelectorMock()
            .mockReturnValueOnce([{ ...customMessage, open: true }])
            .mockReturnValue([])

        render(<SnackbarManager />)

        expect(await screen.findByText('message text')).toBeInTheDocument()
        expect(screen.getByTestId('SnackbarManager__message-0-open')).toHaveStyle('background-color: #c3c3c3')
        expect(screen.getByTestId('FeedbackIcon')).toBeInTheDocument()
    })

})
