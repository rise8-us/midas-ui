import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { DashboardCard } from './index'

describe('<DashboardCard />', () => {

    const options = [
        {
            label: 'option 1',
            id: 1
        },
        {
            label: 'option 2',
            id: 2
        }
    ]

    test('should render', () => {
        render(<DashboardCard title = 'title' options = {options}/>)

        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('option 1')).toBeInTheDocument()
        expect(screen.getByText('option 2')).toBeInTheDocument()
    })

    test('should handle onChange', () => {
        const onChangeMock = jest.fn()

        render(<DashboardCard title = 'title' options = {options} onChange = {onChangeMock}/>)
        fireEvent.click(screen.getByText('option 1'))

        expect(onChangeMock).toHaveBeenCalledWith(1)
    })

    test('should handle defaultOptionId', () => {
        render(<DashboardCard title = 'title' options = {options} defaultOptionId = {1}/>)

        expect(screen.getByText('option 1')).not.toHaveStyle('background-color: transparent')
        expect(screen.getByText('option 2')).toHaveStyle('background-color: transparent')
    })

})