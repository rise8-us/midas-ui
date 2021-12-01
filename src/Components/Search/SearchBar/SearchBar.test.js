import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { SearchBar } from './index'

describe('<SearchBar>', () => {

    test('should handle clearing input on default render', () => {
        render(<SearchBar placeholder = 'placeholder' onChange = {jest.fn} onTextFieldChange = {jest.fn} />)


        userEvent.type(screen.getByPlaceholderText('placeholder'), 'testing')
        expect(screen.getByDisplayValue('testing')).toBeInTheDocument()

        userEvent.clear(screen.getByDisplayValue('testing'))
        expect(screen.queryByDisplayValue('testing')).not.toBeInTheDocument()
    })

    test('should call getOptionLabel', async() => {
        const getOptionalLabelMock = jest.fn((val) => val.name)

        render(<SearchBar
            placeholder = 'placeholder'
            onChange = {jest.fn}
            onTextFieldChange = {jest.fn}
            options = {[{ name: 'testString' }]}
            getOptionLabel = {getOptionalLabelMock}
        />)

        userEvent.type(screen.getByPlaceholderText('placeholder'), 'test')
        fireEvent.click(await screen.findByText('testString'))
        userEvent.tab()

        expect(screen.getByDisplayValue('testString')).toBeInTheDocument()
        expect(getOptionalLabelMock).toHaveBeenCalledWith({ name: 'testString' })

    })

    test('should show options', async() => {
        const onTextFieldChangeMock = jest.fn()
        const onChangeMock = jest.fn()

        render(<SearchBar
            placeholder = 'placeholder'
            onChange = { onChangeMock }
            onTextFieldChange = { onTextFieldChangeMock }
            options = {['testString']}
            displayOnSearch = {false} />)

        userEvent.type(screen.getByPlaceholderText('placeholder'), 'test')

        expect(screen.getByText('testString')).toBeInTheDocument()
    })

})