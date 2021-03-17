import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '../../../Utilities/test-utils'
import { PageNotFound } from './index'

test('<PageNotFound /> - Has correct text', () => {
    render(<MemoryRouter><PageNotFound /></MemoryRouter>)

    expect(screen.getByText(/This is not the page you are looking for./i)).toBeInTheDocument()
})

test('<PageNotFound /> - Redirect goes home', () => {
    render(<MemoryRouter><PageNotFound /></MemoryRouter>)
    const linkElement = screen.getByText(/Go Home/i)

    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/home')
})
