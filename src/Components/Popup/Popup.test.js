import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { Popup } from './index'

describe('<Popup />', () => {

    test('should have string props', () => {
        render(
            <Popup
                title = 'foobar'
                submitText = 'buttonText'
                onClose = {jest.fn()}
                onSubmit = {jest.fn()}
            ><>Hello World Test</></Popup>
        )

        expect(screen.getByText('foobar')).toBeInTheDocument()
        expect(screen.getByText('* are required')).toBeInTheDocument()
        expect(screen.getByText('buttonText')).toBeInTheDocument()
        expect(screen.getByText('Hello World Test')).toBeInTheDocument()
    })

    test('should fire submit function', () => {
        const onCloseFnMock = jest.fn()
        const onSubmitFnMock = jest.fn()

        render(
            <Popup
                title = 'foobar'
                submitText = 'buttonText'
                onClose = {onCloseFnMock}
                onSubmit = {onSubmitFnMock}
            ><>Hello World Test</></Popup>
        )

        fireEvent.click(screen.getByText('buttonText'))
        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(onSubmitFnMock).toHaveBeenCalled()
        expect(onCloseFnMock).toHaveBeenCalled()
    })

    test('should fire submit function', () => {
        render(
            <Popup
                title = 'foobar'
                subtitle = 'fizzbizz'
                hideRequiredText
                onClose = {jest.fn()}
                onSubmit = {jest.fn()}
            ><>Hello World Test</></Popup>
        )

        expect(screen.queryByText('* are required')).not.toBeInTheDocument()
        expect(screen.getByText('fizzbizz')).toBeInTheDocument()
    })
})