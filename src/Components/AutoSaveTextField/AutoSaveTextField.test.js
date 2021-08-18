import React from 'react'
import { render, screen, userEvent } from '../../Utilities/test-utils'
import { AutoSaveTextField } from './index'

describe('<AutoSaveTextField>', () => {

    test('should render', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'yolo'/>)

        expect(screen.getByDisplayValue(/yolo/)).toBeInTheDocument()
    })

    test('should edit and call onSave on ENTER', () => {
        const onSaveMock = jest.fn()

        render(<AutoSaveTextField onSave = {onSaveMock} initialValue = 'test' canEdit/>)
        userEvent.type(screen.getByDisplayValue(/test/), 'in the details{enter}')

        expect(screen.getByDisplayValue(/in the details/)).toBeInTheDocument()
        expect(onSaveMock).toHaveBeenCalledWith('in the details')
    })

    test('should edit and call onSave on Leave', () => {
        const onSaveMock = jest.fn()

        render(<AutoSaveTextField onSave = {onSaveMock} initialValue = 'test' canEdit/>)

        userEvent.type(screen.getByDisplayValue(/test/), 'tabbing outta here')
        userEvent.tab()

        expect(screen.getByDisplayValue(/tabbing outta here/)).toBeInTheDocument()
        expect(onSaveMock).toHaveBeenCalledWith('tabbing outta here')
    })

    test('should edit and revert', () => {
        render(<AutoSaveTextField onSave = {jest.fn()} initialValue = 'test' canEdit/>)
        userEvent.type(screen.getByDisplayValue(/test/), 'in the details{esc}')

        expect(screen.getByDisplayValue(/test/)).toBeInTheDocument()
    })

})