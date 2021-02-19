import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { Header } from './index'

test('<Header /> - Title displays correct information', () => {
    render(<Header title = 'Account Information'  />, { initialState: {} })

    expect(screen.getByText('Account Information')).toBeInTheDocument()
})

test('<Header /> - Subtitle displays correct information', () => {
    render(<Header title = '' subtitle = 'ID: 4' />, { initialState: {} })

    expect(screen.getByText('ID: 4')).toBeInTheDocument()
})

test('<Header /> - Chose icon', () => {
    render(<Header title = '' icon = {<div>Hello</div>}/>, { initialState: { } })

    expect(screen.getByText('Hello')).toBeInTheDocument()
})