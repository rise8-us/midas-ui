import React from 'react'
import { fireEvent, render, screen, useDispatchMock, userEvent } from '../../../Utilities/test-utils'
import { SearchUsers } from './index'

describe('<SearchUsers />', () => {

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

        const input = screen.getByDisplayValue('')
        userEvent.type(input, 'test')
        fireEvent.click(await screen.findByText('foobar'))

        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument()
    })

    test('should render props', () => {
        render(<SearchUsers value = {allUsers[1]} title = 'test title'/>)

        expect(screen.getByText('test title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument()
    })

    // test('should render no options text', async() => {
    //     useDispatchMock().mockResolvedValue({ payload: [] })
    //     render(<SearchUsers value = {allUsers[1]} title = 'test title'/>)

    //     const input = screen.getByDisplayValue('foobar')
    //     userEvent.type(input, 'test')
    //     expect(await screen.findByText('No user(s) found…')).toBeInTheDocument()
    // })

    test('should render options on select', async() => {
        render(<SearchUsers value = {allUsers[1]} title = 'test title'/>)

        const input = screen.getByDisplayValue('foobar')
        userEvent.type(input, 'test')

        const longString = 'jsmith (Jon Jacob Jingle Hiemer Smith)'

        expect(await screen.findByText('foobar')).toBeInTheDocument()
        expect(await screen.findByText(longString)).toBeInTheDocument()
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
