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
    render(<AppBar/>)

    expect(screen.queryByTestId('AppBar__icon-admin')).not.toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).not.toBeInTheDocument()
})

test('<AppBar /> - renders regular user', () => {
    render(<AppBar user = {{ id: 1, isAdmin: false }}/>)

    expect(screen.queryByTestId('AppBar__icon-admin')).not.toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).toBeInTheDocument()

})

test('<AppBar /> - renders admin user', () => {
    render(<AppBar user = {{ id: 1, isAdmin: true }}/>)

    expect(screen.queryByTestId('AppBar__icon-admin')).toBeInTheDocument()
    expect(screen.queryByTestId('AppBar__icon-account')).toBeInTheDocument()
})

test('<AppBar /> - links navigate correctly', () => {
    render(
        <MemoryRouter>
            <AppBar appName = 'APP' appLogo = {appLogo} user = {{ id: 1, isAdmin: true }}/>
        </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('AppBar__icon-admin'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/admin')

    fireEvent.click(screen.getByTestId('AppBar__icon-account'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/account')

    fireEvent.click(screen.getByTestId('AppBar__img-logo'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')

    fireEvent.click(screen.getByText('APP'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')
})