import React from 'react'
import { fireEvent, render, screen } from '../../Utilities/test-utils'
import { SideBar } from './index'

const mockOnClick = jest.fn()

const pages = [
    { label: 'Page1', icon: <div data-testid = 'SideBar__icon'/>, onClick: () => mockOnClick('/page1') },
    { label: 'Page2', icon: <div data-testid = 'SideBar__icon'/>, onClick: () => mockOnClick('/page2') },
]

const mockState = {
    app: {
        navBarOpen: false
    }
}

test('<SideBar> - renders', () => {
    render(<SideBar pages = {pages}/>, { initialState: mockState })

    expect(screen.getAllByTestId('SideBar__icon')).toHaveLength(2)
})

test('<Page /> - Pages navigate properly', () => {
    render(<SideBar pages = {pages}/>, { initialState: mockState })
    fireEvent.click(screen.getByTestId('SideBar__button-collapse'))

    fireEvent.click(screen.getByText('Page1'))
    expect(mockOnClick).toHaveBeenCalledWith('/page1')

    fireEvent.click(screen.getByText('Page2'))
    expect(mockOnClick).toHaveBeenCalledWith('/page2')
})
