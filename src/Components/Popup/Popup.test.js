import React from 'react'
import { fireEvent, render, screen } from '../../Utilities/test-utils'
import { Popup } from './index'

const onCloseFnMock = jest.fn()
const onSubmitFnMock = jest.fn()

beforeEach(() => {
    onCloseFnMock.mockClear()
    onSubmitFnMock.mockClear()
})

test('<Popup /> - test string props', () => {
    render(
        <Popup
            title = 'foobar'
            submitText = 'buttonText'
            onClose = {onCloseFnMock}
            onSubmit = {onSubmitFnMock}
        ><>Hello World Test</></Popup>
    )

    expect(screen.getByText('foobar')).toBeInTheDocument()
    expect(screen.getByText('buttonText')).toBeInTheDocument()
    expect(screen.getByText('Hello World Test')).toBeInTheDocument()
})


test('<Popup /> - submit buttons fire', () => {
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