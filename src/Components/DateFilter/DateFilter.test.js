import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { DateFilter } from './index'

describe('<DateFilter>', () => {
    const setFilterByDateMock = jest.fn()
    const setDateFilterRangeMock = jest.fn()

    const defaultProps = {
        setFilterByDate: setFilterByDateMock,
        setDateFilterRange: setDateFilterRangeMock
    }

    beforeAll(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date(2020, 12, 31))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    test('should render', () => {
        render(<DateFilter {...defaultProps} />)

        expect(screen.getByTestId('FilterAltOffOutlinedIcon')).toBeInTheDocument()
    })


    test('should render with filterByDate set', () => {
        render(<DateFilter {...defaultProps} filterByDate = 'startDate'/>)

        expect(screen.getByTestId('FilterAltOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByTestId('FilterAltOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByTestId('TuneIcon')).toBeInTheDocument()
    })

    test('should handle setFilterByDate onChange', () => {
        const { rerender } = render(<DateFilter {...defaultProps}/>)

        fireEvent.click(screen.getByTestId('FilterAltOffOutlinedIcon'))
        fireEvent.click(screen.getByText('Due Date'))

        expect(setFilterByDateMock).toHaveBeenCalledWith('dueDate')

        rerender(<DateFilter {...defaultProps} filterByDate = 'dueDate'/>)

        fireEvent.click(screen.getByText('Due Date'))

        expect(setFilterByDateMock).toHaveBeenCalledWith(null)
    })

    test('should handleQuarterClick', () => {
        render(<DateFilter {...defaultProps} filterByDate = 'dueDate'/>)

        fireEvent.click(screen.getByTestId('TuneIcon'))
        const quarterOne = screen.getAllByText('Q1')

        setDateFilterRangeMock.mockClear()
        fireEvent.click(quarterOne[0])
        expect(setDateFilterRangeMock).toHaveBeenCalledWith(['2021-01-01', null])

        setDateFilterRangeMock.mockClear()
        fireEvent.click(quarterOne[1])
        expect(setDateFilterRangeMock).toHaveBeenCalledWith([null, '2021-03-31'])
    })

})