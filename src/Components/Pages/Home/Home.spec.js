import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { Home } from './index'

test('<Home /> - Has correct header', () => {
    render(<Home />, { initialState: {} })
    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument()
})

test('<Home /> - Has correct subheader', () => {
    render(<Home />, { initialState: {} })
    const linkElement = screen.getByText(/This is a starter app/i)
    expect(linkElement).toBeInTheDocument()
})
