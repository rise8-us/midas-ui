import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { AssertionStatusDropdown } from './index'

describe('<AssertionStatusDropdown>', () => {
    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            }
        }
    }

    test('should call onChange', () => {
        const onChangeMock = jest.fn()
        render(<AssertionStatusDropdown onChange = {onChangeMock}/>, { initialState: mockState })

        fireEvent.click(screen.getByTitle(/open/i))
        fireEvent.click(screen.getByText(/completed/i))

        expect(onChangeMock).toHaveBeenCalledWith('COMPLETED')
    })

    test('should have red border on error', () => {
        render(<AssertionStatusDropdown error/>, { initialState: mockState })

        expect(screen.getByTestId('AssertionStatusDropdown__input')).toHaveStyle('border: solid 1px red')
    })

})