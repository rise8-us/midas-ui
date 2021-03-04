import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { Home } from './index'

test('<Home /> - Has correct description', () => {
    render(<Home />)
    const linkElement = screen.getByText(/Measures Integration and Deployment Analytics System/i)

    expect(linkElement).toBeInTheDocument()
})
