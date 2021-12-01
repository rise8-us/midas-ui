import React from 'react'
import { render, screen, userEvent } from 'Utilities/test-utils'
import { AutoSaveTextField } from './index'

describe('<AutoSaveTextField>', () => {

    test('should render', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' label = 'title' tooltip = 'tooltip'/>)

        expect(screen.getByDisplayValue('test')).toBeInTheDocument()
        expect(screen.queryByTestId('AutoSaveTextField__input')).not.toHaveClass('MuiInput-underline')
    })

    test('should not fire onSave when canEdit===false', () => {
        const onSaveMock = jest.fn()

        render(<AutoSaveTextField onSave = {onSaveMock} initialValue = 'test' canEdit = {false}/>)

        userEvent.type(screen.getByDisplayValue('test'), 'tabbing outta here')
        userEvent.tab()

        expect(screen.getByDisplayValue('test')).toBeInTheDocument()
        expect(onSaveMock).toHaveBeenCalledTimes(0)
    })


    test('should edit and call onSave on ENTER', () => {
        const onSaveMock = jest.fn()

        render(<AutoSaveTextField onSave = {onSaveMock} initialValue = 'test' canEdit clearAfterSave/>)
        userEvent.type(screen.getByDisplayValue('test'), 'in the details{enter}')

        expect(onSaveMock).toHaveBeenCalledWith('in the details')
        expect(screen.getByTestId('AutoSaveTextField__input').children[0]).toHaveValue('')
    })

    test('should edit and call onSave on Leave', () => {
        const onSaveMock = jest.fn()

        render(<AutoSaveTextField onSave = {onSaveMock} initialValue = 'test' canEdit/>)

        userEvent.type(screen.getByDisplayValue('test'), 'tabbing outta here')
        userEvent.tab()

        expect(screen.getByDisplayValue('tabbing outta here')).toBeInTheDocument()
        expect(onSaveMock).toHaveBeenCalledWith('tabbing outta here')
    })

    test('should edit and revert', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' canEdit/>)
        userEvent.type(screen.getByDisplayValue('test'), 'in the details{esc}')

        expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    })

    test('should render errors', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' errors = {['error']}/>)

        expect(screen.getByText(/error/)).toBeInTheDocument()
    })

    test('should handle underline', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' canEdit/>)

        userEvent.hover(screen.getByDisplayValue('test'))
        expect(screen.getByTestId('AutoSaveTextField__input')).toHaveClass('MuiInput-underline')

        userEvent.unhover(screen.getByDisplayValue('test'))
        expect(screen.queryByTestId('AutoSaveTextField__input')).not.toHaveClass('MuiInput-underline')
    })

    test('should handle revertOnSave', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' canEdit revertOnEmpty/>)

        expect(screen.getByDisplayValue('test')).toBeInTheDocument()

        userEvent.click(screen.getByDisplayValue('test'))
        userEvent.clear(screen.getByDisplayValue('test'))

        expect(screen.getByDisplayValue('')).toBeInTheDocument()

        userEvent.tab()
        expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    })
})