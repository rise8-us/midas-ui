import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../Utilities/test-utils'
import { UserSettings } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

const requestUpdateUserMock = useModuleMock('Redux/Users/actions', 'requestUpdateUser')

const user = {
    id: 4,
    username: 'jsmith',
    displayName: 'Jafar Smith',
    email: 'dsmith@aol.com',
    roles: ['admin'],
    isAdmin: true
}

test('<UserSettings /> - Has correct general information', () => {
    render(<UserSettings user = {user}/>)

    expect(screen.getByText('General Information')).toBeInTheDocument()
    expect(screen.getByText('save')).toBeInTheDocument()
})

test('<UserSettings /> - Has correct input labels', () => {
    render(<UserSettings user = {user}/>)

    expect(screen.getByTestId('UserSettings__settings')).toHaveTextContent('Username')
    expect(screen.getByTestId('UserSettings__settings')).toHaveTextContent('Display Name *')
    expect(screen.getByTestId('UserSettings__settings')).toHaveTextContent('Email *')

})

test('<UserSettings /> - can update Display Name', () => {
    const { getByTestId } = render(<UserSettings user = {user}/>)
    const element = within(getByTestId('UserSettings__input-display-name')).getByRole('textbox')
    expect(element).toHaveValue('Jafar Smith')

    userEvent.clear(element)
    userEvent.type(element, 'Will Smith')
    expect(element).toHaveValue('Will Smith')
})

test('<UserSettings /> - can update Email', () => {
    const { getByTestId } = render(<UserSettings user = {user}/>)
    const element = within(getByTestId('UserSettings__input-email')).getByRole('textbox')
    expect(element).toHaveValue('dsmith@aol.com')

    userEvent.clear(element)
    userEvent.type(element, 'jdoe@a.b')
    expect(element).toHaveValue('jdoe@a.b')
})

test('<UserSettings /> - can save changes', () => {
    useDispatchMock().mockReturnValue({})
    render(<UserSettings user = {user}/>)
    fireEvent.click(screen.getByTestId('UserSettings__button-save'))

    expect(requestUpdateUserMock).toHaveBeenCalledTimes(1)
})