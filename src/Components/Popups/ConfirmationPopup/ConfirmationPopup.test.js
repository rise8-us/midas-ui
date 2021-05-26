import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { ConfirmationPopup } from './index'

describe('<ConfirmationPopup />', () => {

    test('should render', () => {
        render(<ConfirmationPopup detail = 'detail'/>)

        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('Please confirm or cancel')).toBeInTheDocument()
        expect(screen.getByText('detail')).toBeInTheDocument()
    })

    test('should not render', () => {
        render(<ConfirmationPopup detail = 'detail' open = {false}/>)

        expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
    })

    test('should fire onCancel prop', () => {
        const onCancelFnMock = jest.fn()

        render(<ConfirmationPopup detail = 'detail' onCancel = {onCancelFnMock}/>)
        fireEvent.click(screen.getByText('cancel'))

        expect(onCancelFnMock).toHaveBeenCalled()
    })

    test('should fire onConfirm prop', () => {
        const onConfirmFnMock = jest.fn()

        render(<ConfirmationPopup detail = 'detail' onConfirm = {onConfirmFnMock}/>)
        fireEvent.click(screen.getByText('confirm'))

        expect(onConfirmFnMock).toHaveBeenCalled()
    })

    test('should handle isOpen via props', () => {
        const { rerender } = render(<ConfirmationPopup detail = 'detail' open = {false}/>)
        expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
        rerender(<ConfirmationPopup detail = 'detail' open = {true}/>)

        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })
})