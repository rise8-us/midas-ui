import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import appLogo from '../../Assets/appLogo.png'
import { fireEvent, render, screen } from '../../Utilities/test-utils'
import { AppBar } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

test('<AppBar> - renders no user', () => {
    render(<AppBar appName = 'Test' appLogo = {appLogo} />)

    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-admin')).not.toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).not.toBeInTheDocument()
})

test('<AppBar /> - renders regular user', () => {
    render(<MemoryRouter><AppBar user = {{ id: 1, isAdmin: false }}/></MemoryRouter>)

    expect(screen.queryByTestId('AppBar__icon-admin')).not.toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).toBeInTheDocument()

})

test('<AppBar /> - renders admin user', () => {
    render(<MemoryRouter><AppBar user = {{ id: 1, isAdmin: true }}/></MemoryRouter>)

    expect(screen.queryByTestId('AppBar__icon-admin')).toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).toBeInTheDocument()
})

test('<AppBar /> - links nagigate correctly', () => {
    render(<MemoryRouter><AppBar user = {{ id: 1, isAdmin: true }}/></MemoryRouter>)

    fireEvent.click(screen.getByTestId('AppBar__icon-admin'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/admin')

    fireEvent.click(screen.getByTestId('AppBar__icon-account'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/account')
})