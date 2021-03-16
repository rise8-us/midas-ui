/* eslint-disable react/display-name */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { render, screen, useDispatchMock } from './Utilities/test-utils'

const mockState = {
    auth: {
        user: {
            roles: 0
        },
        isAdmin: true
    }
}

jest.mock('./Components/PopupManager/PopupManager', () => () => (<div/>))

test('<App /> - Has correct text', () => {
    useDispatchMock().mockReturnValue({ payload: [{}] })

    render(<MemoryRouter><App /></MemoryRouter>, { initialState: mockState })

    expect(screen.getByText(/MIDAS/i)).toBeInTheDocument()
})