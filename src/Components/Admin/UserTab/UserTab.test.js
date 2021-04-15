import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UserTab } from './index'

describe('<UserTab />', () => {

    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectUserByIdMock.mockReturnValue({})
    })

    test('Titles display correctly', () => {
        render(<UserTab />)

        expect(screen.getByText('User Management')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Search by User ID')).toBeInTheDocument()
    })

    test('Can update User Search Bar', () => {
        render(<UserTab />)
        const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

        userEvent.type(element, '1')
        expect(element).toHaveValue('1')
    })

    test('Should show General Information with change options', () => {
        const { rerender } = render(<UserTab />)
        const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

        userEvent.type(element, '1')
        selectUserByIdMock.mockReturnValue({
            id: 1,
            username: 'yoda',
            displayName: '',
            email: '',
            roles: {}
        })
        rerender(<UserTab />)
        fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

        expect(screen.getByText('General Information')).toBeInTheDocument()

    })

    test('Does NOT Show error or info with empty input', async() => {
        render(<UserTab />)
        const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

        userEvent.type(element, ' ')
        fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

        expect(await screen.queryByText('General Information')).not.toBeInTheDocument()
    })

    test('Displays: User Does not exist when user is not in database', async() => {
        render(<UserTab />)
        const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

        userEvent.type(element, '1')
        fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

        expect(await screen.getByText('User ID: 1 Does not exist')).toBeInTheDocument()
    })
})