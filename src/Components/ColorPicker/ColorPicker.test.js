import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { ColorPicker } from './index'

describe('<ColorPicker />', () => {
    const onColorPickerChange = jest.fn()

    test('should render properly with error', () => {
        render(<ColorPicker color = '#e91e63'
            colorError = {['error']}
            onColorPickerChange = {onColorPickerChange}
        />)

        expect(screen.getByTestId('ColorPicker__input-color')).toBeInTheDocument()
        expect(screen.getByTitle('#e91e63')).toBeInTheDocument()
        expect(screen.getByText('error')).toBeInTheDocument()
    })

    test('should render properly without error', () => {
        render(<ColorPicker color = '#e91e63' colorError = {[]} onColorPickerChange = {onColorPickerChange} />)

        expect(screen.getByTestId('ColorPicker__input-color')).toBeInTheDocument()
        expect(screen.getByTitle('#e91e63')).toBeInTheDocument()
    })

})