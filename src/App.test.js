import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { render, screen, useDispatchMock } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => function testing() { return (<div/>) })

describe('<App />', () => {

    const consoleSpy = jest.spyOn(console, 'error').mockReturnValue(() => {})

    test('Has correct text', async() => {
        useDispatchMock().mockReturnValue({ meta: { requestStatus: 'fulfilled' }, payload: [{}] })

        render(<MemoryRouter><App /></MemoryRouter>, {
            initialState: {
                auth: {
                    user: {
                        roles: 0
                    },
                    isAdmin: true
                }
            }
        })

        expect(await screen.findByText('MIDAS')).toBeInTheDocument()
    })

    test('Init fetch fails throws error', async() => {
        useDispatchMock().mockReturnValue({ meta: { requestStatus: 'failed' }, payload: [{}] })

        render(<MemoryRouter><App /></MemoryRouter>)

        expect(await consoleSpy).toHaveBeenCalledWith('INIT FAILED')
    })
})