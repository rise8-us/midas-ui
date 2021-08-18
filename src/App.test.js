import React from 'react'
import App from './App'
import { renderWithRouter, screen, useDispatchMock } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => function testing() { return (<div/>) })
jest.mock('./Components/WebsocketProvider/WebsocketProvider', () => function testing() {  return (<div/>) })

describe('<App />', () => {

    const consoleSpy = jest.spyOn(console, 'error').mockReturnValue(() => { /* Empty */ })

    test('Has correct text', async() => {
        useDispatchMock().mockReturnValue({ meta: { requestStatus: 'fulfilled' }, payload: [{}] })

        renderWithRouter(<App />, {
            initialState: {
                auth: {
                    user: {
                        roles: 0
                    },
                    isAdmin: true
                }
            }
        })

        expect(await screen.findAllByText(/not connected to server/i)).toHaveLength(2)
    })

    test('Init fetch fails throws error', async() => {
        useDispatchMock().mockReturnValue({ meta: { requestStatus: 'failed' }, payload: [{}] })

        renderWithRouter(<App />)

        expect(await consoleSpy).toHaveBeenCalledWith('INIT FAILED')
    })
})