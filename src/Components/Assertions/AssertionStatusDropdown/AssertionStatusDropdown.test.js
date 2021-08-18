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
        render(<AssertionStatusDropdown onChange = {onChangeMock} hasAccess = {true}/>, { initialState: mockState })

        fireEvent.click(screen.getByText(/not started/i))
        fireEvent.click(screen.getByText(/completed/i))

        expect(onChangeMock).toHaveBeenCalledWith('COMPLETED')
    })

    test('should handle no color', () => {
        render(<AssertionStatusDropdown option = {{ label: 'Started' }} hasAccess = {true}/>)

        expect(screen.getByText(/started/i)).toHaveStyle('color: #ffffff')
    })

    test('should call onClick prop', () => {
        const onClickMock = jest.fn()
        render(<AssertionStatusDropdown onClick = {onClickMock} hasAccess = {true}/>)

        fireEvent.click(screen.getByText(/not started/i))

        expect(onClickMock).toHaveBeenCalled()
    })

    test('should not open Popper with no access', () => {
        const onClickMock = jest.fn()
        render(<AssertionStatusDropdown onClick = {onClickMock} hasAccess = {false}/>)

        fireEvent.click(screen.getByText(/not started/i))

        expect(onClickMock).not.toHaveBeenCalled()
    })

})