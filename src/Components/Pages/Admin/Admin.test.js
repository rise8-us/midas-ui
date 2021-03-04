import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, within, useModuleMock, fireEvent, useDispatchMock } from '../../../Utilities/test-utils'
import { Admin } from './index'

const mockUser1 = {
    id: 1,
    username: 'yoda',
    displayName: '',
    email: '',
    roles: {}
}

const getUserByIdMock = useModuleMock('Redux/Users/selectors', 'getUserById')

test('<Admin /> - Title displays correct information', () => {
    getUserByIdMock.mockReturnValue({ })
    render(<Admin title = 'Admin Portal'  />, { initialState: {} })

    expect(screen.getByText('Admin Portal')).toBeInTheDocument()
})

test('<Admin /> - Has correct input labels', () => {
    getUserByIdMock.mockReturnValue({ })
    render(<Admin />)

    expect(screen.getByPlaceholderText('Search by User ID')).toBeInTheDocument()
})

test('<Admin /> - can update User Search Bar', () => {
    useDispatchMock().mockReturnValue({})
    getUserByIdMock.mockReturnValue({ })
    render(<Admin />)
    const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

    userEvent.type(element, '1')
    expect(element).toHaveValue('1')
})

test('<Admin /> - Should show General Information with change options', () => {
    useDispatchMock().mockReturnValue({})
    getUserByIdMock.mockReturnValue({ })
    const { rerender } = render(<Admin />)
    const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

    userEvent.type(element, '1')
    getUserByIdMock.mockReturnValue({ mockUser1 })
    rerender(<Admin  />)
    fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

    expect(screen.getByText('General Information')).toBeInTheDocument()

})

test('<Admin /> - Does NOT Show error or info with empty input', () => {
    useDispatchMock().mockReturnValue({})
    getUserByIdMock.mockReturnValue({})
    const { rerender } = render(<Admin />)
    const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

    userEvent.type(element, ' ')

    getUserByIdMock.mockReturnValue({})
    rerender(<Admin />)
    fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

    expect(screen.queryByText('General Information')).not.toBeInTheDocument()
})

test('<Admin /> - Displays: User Does not exist when user is not in database', () => {
    useDispatchMock().mockReturnValue({})
    getUserByIdMock.mockReturnValue({})
    const { rerender } = render(<Admin />)
    const element = within(screen.getByTestId('InputBase__input-user-id')).getByRole('textbox')

    userEvent.type(element, '1')
    getUserByIdMock.mockReturnValue({})
    rerender(<Admin />)
    fireEvent.click(screen.getByTestId('InputBase__button-user-id'))

    expect(screen.getByText('User ID: 1 Does not exist')).toBeInTheDocument()
})

