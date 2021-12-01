import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { AddComment } from './index'

describe('<AddComment>', () => {

    const onSubmitMock = jest.fn()

    afterEach(() => {
        onSubmitMock.mockReset()
    })

    test('should render', () => {
        render(<AddComment additionalNode = {<div>foobar</div>} onSubmit = {onSubmitMock}/>)

        expect(screen.getByText('foobar')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter comment here...')).toBeInTheDocument()
    })

    test('should handle {enter} key', () => {
        render(<AddComment onSubmit = {onSubmitMock} handleEnterKey/>)

        userEvent.type(screen.getByPlaceholderText(/enter comment here.../i), 'a new comment!{enter}')

        expect(onSubmitMock).toHaveBeenCalledTimes(1)
        expect(onSubmitMock).toHaveBeenCalledWith('a new comment!')
    })

    test('should show submit button on render', () => {
        render(<AddComment onSubmit = {onSubmitMock} showSubmitButton/>)

        expect(screen.getByText('submit')).toBeInTheDocument()

        fireEvent.click(screen.getByText(/submit/i))
        expect(onSubmitMock).toHaveBeenCalled()
    })
})