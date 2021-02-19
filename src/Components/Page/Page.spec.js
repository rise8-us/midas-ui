import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '../../Utilities/test-utils'
import { Page } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

const mockState = {
    auth: {
        user: {
            roles: 0
        },
        isAdmin: true
    }
}

test('<Page /> - condense', () => {
    render(<Page><div/></Page>)
    const linkElement = screen.getByTestId('Page__navigation-sidebar')
    expect(linkElement).toBeInTheDocument()
    expect(screen.queryByText('Collapse')).toBeNull()
})

test('<Page /> - expand', () => {
    render(<Page><div/></Page>)
    const linkElement = screen.getByTestId('Page__button-collapse')
    fireEvent.click(linkElement)
    expect(screen.queryByText('Collapse')).toBeInTheDocument()
})

test('<Page /> - reg user - contains two pages', () => {
    render(<Page><div/></Page>)
    const linkElements = screen.queryAllByTestId('Page__link')
    expect(linkElements).toHaveLength(2)
})

test('<Page /> - admin user - contains three pages', () => {
    render(<Page><div/></Page>, { initialState: mockState })
    const linkElements = screen.queryAllByTestId('Page__link')
    expect(linkElements).toHaveLength(3)
})

test('<Page /> - Pages navigate properly', () => {
    render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })
    const linkElement = screen.getByTestId('Page__button-collapse')
    fireEvent.click(linkElement)

    // Account Page link
    fireEvent.click(screen.getByText('Account'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/account')

    // Home Page link
    fireEvent.click(screen.getByText('Home'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')

    // Admin Page link
    fireEvent.click(screen.getByText('Admin'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/admin')
})