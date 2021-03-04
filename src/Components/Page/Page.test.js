import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, useModuleMock } from '../../Utilities/test-utils'
import { Page } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

const getUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'getUserLoggedIn')

const mockState = {
    app: {
        navBarOpen: false
    }
}

test('<Page> - renders', () => {
    getUserLoggedInMock.mockReturnValue({ isAdmin: false })

    render(<Page><div/></Page>, { initialState: mockState })

    expect(screen.getAllByTestId('Page__icon')).toHaveLength(1)
})

test('<Page /> - Pages navigate properly', () => {
    render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })

    // Home Page link
    fireEvent.click(screen.getAllByTestId('Page__icon')[0])
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')
})