import React from 'react'
import { fireEvent, render, screen, userEvent, waitForElementToBeRemoved } from 'Utilities/test-utils'
import { DateRangeSelector } from './index'

const mockOnSelect = jest.fn()
const initialStart = '2020-01-01'
const initialEnd = '2020-12-31'

const defaultProps = { onSelect: mockOnSelect, initialStart, initialEnd }

describe('<DateRangeSelector />', () => {

    test('should render', () => {
        render(<DateRangeSelector {...defaultProps}/>)

        expect(screen.getByDisplayValue('01/01/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('12/31/2020')).toBeInTheDocument()
    })

    test('should trigger onSelect useEffect', () => {
        render(<DateRangeSelector {...defaultProps}/>)
        mockOnSelect.mockReset()

        fireEvent.click(screen.getByDisplayValue('01/01/2020'))
        fireEvent.click(screen.getByLabelText('Next month'))
        fireEvent.click(screen.getByLabelText('Feb 1, 2020'))

        expect(mockOnSelect.mock.calls[0][0]).toMatch(/2020-02-01/)
        expect(mockOnSelect.mock.calls[0][1]).toMatch(/2020-12-31/)
    })

    test('should clear both inputs', async() => {
        render(<DateRangeSelector {...defaultProps}/>)
        mockOnSelect.mockReset()
        const inputs = screen.getAllByPlaceholderText('mm/dd/yyyy')

        userEvent.hover(inputs[0])
        fireEvent.click(screen.getByTestId('ClearIcon'))
        userEvent.unhover(inputs[0])
        await waitForElementToBeRemoved(screen.getByTestId('ClearIcon'))
        userEvent.hover(inputs[1])
        fireEvent.click(screen.getByTestId('ClearIcon'))

        expect(mockOnSelect).toHaveBeenNthCalledWith(1, null, '2020-12-31')
        expect(mockOnSelect).toHaveBeenLastCalledWith(null, null)
    })
})