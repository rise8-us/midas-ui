import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { render, screen, useDispatchMock } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => function testing() { return (<div/>) })

describe('<App />', () => {

    const mockState = {
        auth: {
            user: {
                roles: 0
            },
            isAdmin: true
        }
    }

    test('Has correct text', () => {
        useDispatchMock().mockReturnValue({ meta: { requestState: 'fulfilled' }, payload: [{}] })

        render(<MemoryRouter><App /></MemoryRouter>, { initialState: mockState })

        expect(screen.getByText(/MIDAS/i)).toBeInTheDocument()
    })
})