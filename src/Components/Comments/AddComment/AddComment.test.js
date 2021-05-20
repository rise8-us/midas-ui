import React from 'react'
import { fireEvent, render, screen, userEvent } from '../../../Utilities/test-utils'
import { AddComment } from './index'

describe('<AddComment>', () => {

    test('should render', () => {
        const onSubmitMock = jest.fn()
        render(<AddComment additionalNode = {<div>foobar</div>} onSubmit = {onSubmitMock}/>)

        expect(screen.getByText('foobar')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/enter comment here.../i)).toBeInTheDocument()

        fireEvent.click(screen.getByText(/submit/i))
        expect(onSubmitMock).toHaveBeenCalled()
    })

    test('should handle {enter} key', () => {
        const onSubmitMock = jest.fn()
        render(<AddComment onSubmit = {onSubmitMock} handleEnterKey/>)

        userEvent.type(screen.getByPlaceholderText(/enter comment here.../i), 'a new comment!{enter}')

        expect(onSubmitMock).toHaveBeenCalledTimes(1)
        expect(onSubmitMock).toHaveBeenCalledWith('a new comment!')
    })

})