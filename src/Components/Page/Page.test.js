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

describe('<Page />', () => {
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    const mockState = {
        app: {
            navBarOpen: false
        }
    }

    beforeEach(() => {
        selectUserLoggedInMock.mockReturnValue({})
    })

    afterEach(() => {
        mockHistoryPush.mockClear()
    })

    test('renders', () => {
        render(<Page><div>This is a test</div></Page>, { initialState: mockState })

        expect(screen.getByText(/This is a test/i)).toBeInTheDocument()
    })

    test('Pages navigate to home', () => {
        render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })

        fireEvent.click(screen.getAllByTestId('Page__icon')[0])
        expect(mockHistoryPush).toHaveBeenCalledWith('/home')
    })

    test('Pages navigate to projects', () => {
        render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })

        fireEvent.click(screen.getAllByTestId('Page__icon')[1])
        expect(mockHistoryPush).toHaveBeenCalledWith('/projects')
    })

    test('Pages navigate to tags', () => {
        render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })

        fireEvent.click(screen.getAllByTestId('Page__icon')[2])
        expect(mockHistoryPush).toHaveBeenCalledWith('/tags')
    })
})
