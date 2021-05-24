import React from 'react'
import { fireEvent, render, screen, userEvent } from '../../../Utilities/test-utils'
import { AssertionHeader } from './index'

describe('<AssertionHeader>', () => {

    test('should render', () => {
        render(<AssertionHeader category = 'category' detail = 'detail'/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByDisplayValue(/detail/)).toBeInTheDocument()
    })

    test('should call onChange & update value', () => {
        const onChangeMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' defaultEditable onChange = {onChangeMock}/>)

        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')

        expect(onChangeMock).toHaveBeenCalled()
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
    })

    test('should edit and restore', () => {
        render(<AssertionHeader category = 'cat' detail = 'devils' editable/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('restore'))
        expect(screen.getByDisplayValue(/devils/)).toBeInTheDocument()
    })

    test('should edit and save', () => {
        const OnSaveMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onSave = {OnSaveMock}/>)

        fireEvent.click(screen.getByTitle('edit'))
        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('save'))
        expect(OnSaveMock).toHaveBeenCalled()
    })

    test('should call onEditClick', () => {
        const onEditClickMock = jest.fn()
        render(<AssertionHeader category = 'cat' detail = 'devils' editable onEditClick = {onEditClickMock}/>)

        fireEvent.click(screen.getByTitle('edit'))

        expect(onEditClickMock).toHaveBeenCalledWith(true)
    })

    test('should see status', () => {
        render(<AssertionHeader category = 'cat' detail = 'devils' status = 'STARTED'/>, {
            initialState: {
                app: {
                    assertionStatus: {
                        STARTED: {
                            name: 'STARTED',
                            label: 'Started',
                            color: '#000000'
                        }
                    }
                }
            }
        })

        expect(screen.getByText('Started')).toBeInTheDocument()
    })
})