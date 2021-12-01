import React from 'react'
import {
    fireEvent, render, screen, selectAssertionStatusesMock, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { UpdateStatusPopup } from './index'

describe('<UpdateStatusPopup />', () => {
    jest.setTimeout(20000)

    const requestCreateCommentMock = useModuleMock('Redux/Comments/actions', 'requestCreateComment')
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    beforeEach(() => {
        selectAssertionStatusesMock()
        closePopupMock.mockReset()
        useDispatchMock().mockResolvedValue({})
    })

    test('should render', () => {
        render(<UpdateStatusPopup />)

        expect(screen.getByLabelText('Status')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your status update here')).toBeInTheDocument()
    })

    test('should close popup onCancel', () => {
        render(<UpdateStatusPopup />)

        fireEvent.click(screen.getByText('cancel'))

        expect(closePopupMock).toHaveBeenCalledWith('UpdateStatusPopup')
    })

    test('should show errors when inputs are empty on Submit', async() => {
        render(<UpdateStatusPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(await screen.findByText('Status cannot be blank!')).toBeInTheDocument()
        expect(await screen.findByText('Details cannot be blank!')).toBeInTheDocument()
    })

    test('should show detail error when input is empty', async() => {
        render(<UpdateStatusPopup/>)

        expect(screen.queryByText('Details cannot be blank!')).not.toBeInTheDocument()

        userEvent.type(screen.getByPlaceholderText('Enter your status update here'), 'x{backspace}')

        expect(await screen.findByText('Details cannot be blank!')).toBeInTheDocument()
    })

    test('should show status error when input is empty', async() => {
        render(<UpdateStatusPopup/>)

        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('On Track'))

        expect(screen.queryByText('Status cannot be blank!')).not.toBeInTheDocument()

        fireEvent.click(screen.getByTitle('Clear'))

        expect(await screen.findByText('Status cannot be blank!')).toBeInTheDocument()
    })

    test('should handle onSubmit', () => {
        render(<UpdateStatusPopup assertionId = {1}/>)

        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('On Track'))
        userEvent.type(screen.getByPlaceholderText('Enter your status update here'), 'an untitled note')
        fireEvent.click(screen.getByText('Submit'))

        expect(requestCreateCommentMock).toHaveBeenCalledWith({
            assertionId: 1,
            measureId: null,
            text: 'an untitled note###ON_TRACK'
        })

        waitFor(() => { expect(closePopupMock).toHaveBeenCalled() })
    })

})