import React from 'react'
import { fireEvent, render, screen, useDispatchMock, userEvent } from '../../../Utilities/test-utils'
import { SearchUsers } from './index'

describe('<SearchUsers />', () => {
    jest.setTimeout(10000)

    const allUsers = [
        {
            id: 10,
            username: 'jsmith',
            displayName: 'Jon Jacob Jingle Hiemer Smith'
        }, {
            id: 11,
            username: 'foobar',
            dislayName: ''
        }
    ]

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: allUsers })
    })

    test('should render default', async() => {
        render(<SearchUsers />)

        expect(screen.getByText(/Search users/i)).toBeInTheDocument()
        expect(screen.getByDisplayValue('')).toBeInTheDocument()
    })

    test('should render props', () => {
        render(<SearchUsers value = {allUsers[1]} title = 'test title'/>)

        expect(screen.getByText('test title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument()
    })

    test('shoulld call onChange prop', async() => {
        const onChangePropMock = jest.fn()
        render(<SearchUsers onChange = {onChangePropMock}/>)

        const input = screen.getByDisplayValue('')
        userEvent.type(input, 'test')

        fireEvent.click(await screen.findByText('foobar'))

        expect(onChangePropMock).toHaveBeenCalledTimes(1)
    })

})
