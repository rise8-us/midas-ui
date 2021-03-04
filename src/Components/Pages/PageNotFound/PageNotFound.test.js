import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '../../../Utilities/test-utils'
import { PageNotFound } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

test('<PageNotFound /> - Has correct text', () => {
    render(<MemoryRouter><PageNotFound /></MemoryRouter>, { initialState: {} })
    const linkElement = screen.getByText(/This is not the page you are looking for./i)
    expect(linkElement).toBeInTheDocument()
})

test('<PageNotFound /> - Redirect goes home', () => {
    render(<MemoryRouter><PageNotFound /></MemoryRouter>, { initialState: {} })
    const linkElement = screen.getByText(/Go Home/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/home')
})
