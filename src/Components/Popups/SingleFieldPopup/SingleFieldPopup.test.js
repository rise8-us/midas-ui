import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { SingleFieldPopup } from './index'

describe('<Popup />', () => {

    const defaultRequiredProps = {
        title: 'single field title',
        onSubmit: jest.fn,
        onClose: jest.fn
    }

    test('should have string props', () => {
        const { rerender } = render(<SingleFieldPopup {...defaultRequiredProps} initialValue = 'test'/>)

        rerender(<SingleFieldPopup {...defaultRequiredProps} initialValue = 'a new thing' />)
        rerender(<SingleFieldPopup {...defaultRequiredProps} isOpen/>)

        expect(screen.getByText('single field title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('a new thing')).toBeInTheDocument()
    })

    test('should fire onClose function', () => {
        const onCloseFnMock = jest.fn()

        render(<SingleFieldPopup {...defaultRequiredProps} onClose = {onCloseFnMock} isOpen/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(onCloseFnMock).toHaveBeenCalled()
    })

    test('should fire onSubmit function', () => {
        const onSubmitFnMock = jest.fn()

        render(<SingleFieldPopup {...defaultRequiredProps} onSubmit = {onSubmitFnMock} isOpen/>)

        userEvent.type(screen.getByPlaceholderText('No current value set...'), 'yolo')
        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(onSubmitFnMock).toHaveBeenCalledWith('yolo')
    })
})