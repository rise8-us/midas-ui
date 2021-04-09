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
    const getUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'getUserLoggedIn')

    const mockState = {
        app: {
            navBarOpen: false
        }
    }

    beforeEach(() => {
        getUserLoggedInMock.mockReturnValue({})
    })

    test('renders', () => {
        render(<Page><div>This is a test</div></Page>, { initialState: mockState })

        expect(screen.getByText(/This is a test/i)).toBeInTheDocument()
    })

    test('Pages navigate properly', () => {
        render(<MemoryRouter><Page><div/></Page></MemoryRouter>, { initialState: mockState })

        fireEvent.click(screen.getAllByTestId('Page__icon')[0])
        expect(mockHistoryPush).toHaveBeenCalledWith('/home')

        fireEvent.click(screen.getAllByTestId('Page__icon')[1])
        expect(mockHistoryPush).toHaveBeenCalledWith('/tags')
    })

})
