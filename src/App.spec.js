import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { render, screen, useDispatchMock } from './Utilities/test-utils'

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

test('<App /> - Has correct text', () => {
    useDispatchMock().mockReturnValue({ payload: [{}] })
    render(<MemoryRouter><App /></MemoryRouter>, { initialState: mockState })

    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument()
})