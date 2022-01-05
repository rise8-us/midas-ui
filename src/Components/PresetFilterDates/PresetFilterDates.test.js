import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { PresetFilterDates } from './index'

describe('<PresetFilterDates>', () => {
    const onQuarterClickMock = jest.fn()
    const onYearChangeMock = jest.fn()

    const defaultProps = {
        onQuarterClick: onQuarterClickMock,
        onYearChange: onYearChangeMock
    }

    test('should render', () => {
        render(<PresetFilterDates {...defaultProps} />)

        expect(screen.getByText('From')).toBeInTheDocument()
        expect(screen.getByText('To')).toBeInTheDocument()
        expect(screen.getByText('Calendar')).toBeInTheDocument()
        expect(screen.getByTestId('ArrowLeftIcon')).toBeInTheDocument()
        expect(screen.getByTestId('ArrowRightIcon')).toBeInTheDocument()
    })

    test('should handle type changes', () => {
        render(<PresetFilterDates {...defaultProps}/>)

        fireEvent.click(screen.getByText('Calendar'))

        expect(screen.getByText('Government')).toBeInTheDocument()
    })

    test('should handle year changes', () => {
        render(<PresetFilterDates {...defaultProps} year = {2021}/>)

        fireEvent.click(screen.getByTestId('ArrowLeftIcon'))
        expect(onYearChangeMock).toHaveBeenCalledWith(2020)

        fireEvent.click(screen.getByTestId('ArrowRightIcon'))
        expect(onYearChangeMock).toHaveBeenCalledWith(2022)
    })

    test('should handleQuarterClick', () => {
        render(<PresetFilterDates {...defaultProps} year = {2021}/>)

        const quarterOne = screen.getAllByText('Q1')

        fireEvent.click(quarterOne[0])
        expect(onQuarterClickMock).toHaveBeenCalledWith('from', '2021-01-01')

        fireEvent.click(quarterOne[1])
        expect(onQuarterClickMock).toHaveBeenCalledWith('to', '2021-03-31')
    })

})