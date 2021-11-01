import React from 'react'
import {
    act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { SearchBar } from './index'

describe('<SearchBar>', () => {

    test('should render', () => {
        render(<SearchBar placeholder = 'placeholder'/>)

        expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument()
        expect(screen.getByTitle('Search')).toBeInTheDocument()
    })

    test('should handle clear input', () => {
        render(<SearchBar placeholder = 'placeholder'/>)

        expect(screen.queryByTitle('clear')).not.toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText('placeholder'), 'testing')

        expect(screen.getByDisplayValue('testing')).toBeInTheDocument()
        expect(screen.getByTitle('clear')).toBeInTheDocument()
        fireEvent.click(screen.getByTitle('clear'))
        expect(screen.queryByTitle('clear')).not.toBeInTheDocument()
        expect(screen.queryByDisplayValue('testing')).not.toBeInTheDocument()
    })

    test('should not render clear icon', () => {
        render(<SearchBar placeholder = 'placeholder' disableClearable/>)

        expect(screen.queryByTitle('clear')).not.toBeInTheDocument()

        userEvent.type(screen.getByPlaceholderText('placeholder'), 'testing')
        expect(screen.queryByTitle('clear')).not.toBeInTheDocument()
    })

    // not triggering -- need to loook into once we starting using net reqs w/ searching & pagination
    test.skip('should show searching icon on long running jobs', async() => {
        const longRunningSearchMock = async() => new Promise(resolve =>
            setTimeout(() => resolve('success'), 2000))
        jest.useFakeTimers()

        render(<SearchBar placeholder = 'placeholder' search = {longRunningSearchMock}/>)
        userEvent.type(screen.getByPlaceholderText('placeholder'), 'testing')

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        expect(screen.getByTitle('searching')).toBeInTheDocument()

        waitForElementToBeRemoved(() => screen.getByTitle('searching'))
    })

    test('should call search prop', async() => {
        const searchMock = jest.fn()

        render(<SearchBar placeholder = 'placeholder' search = {searchMock}/>)
        userEvent.type(screen.getByPlaceholderText('placeholder'), 'testing')

        waitFor(() => expect(searchMock).toHaveBeenCalledWith('testing'))
    })

})