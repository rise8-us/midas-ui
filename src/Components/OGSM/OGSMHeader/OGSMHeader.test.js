import React from 'react'
import { fireEvent, render, screen, userEvent } from '../../../Utilities/test-utils'
import { OGSMHeader } from './index'

describe('<OGSMHeader>', () => {

    test('should render', () => {
        render(<OGSMHeader category = 'category' detail = 'detail'/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByText(/detail/)).toBeInTheDocument()
    })

    test('should call onChange & update value', () => {
        const onChangeMock = jest.fn()
        render(<OGSMHeader category = 'cat' detail = 'devils' onChange = {onChangeMock}/>)

        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')

        expect(onChangeMock).toHaveBeenCalled()
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
    })

    test('should edit and restore', () => {
        render(<OGSMHeader category = 'cat' detail = 'devils' editable/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('restore'))
        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and save', () => {
        const OnSaveMock = jest.fn()
        render(<OGSMHeader category = 'cat' detail = 'devils' editable onSave = {OnSaveMock}/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('save'))
        expect(OnSaveMock).toHaveBeenCalledWith('in the details')
    })
})