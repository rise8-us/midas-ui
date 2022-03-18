import { render, screen, userEvent } from 'Utilities/test-utils'
import { ColorPicker } from './index'

describe('<ColorPicker />', () => {
    const onColorChange = jest.fn()

    test('should render properly with error', () => {
        render(<ColorPicker errors = {['error']} onChange = {onColorChange} />)

        expect(screen.getByText('error')).toBeInTheDocument()
    })

    test('should render properly without error', () => {
        render(<ColorPicker initialColor = '#e91e63' onChange = {onColorChange} />)

        expect(screen.getByRole('textbox')).toHaveValue('#e91e63')
    })

    test('should only take valid input', () => {
        render(<ColorPicker onChange = {onColorChange} />)

        const input = screen.getByRole('textbox')

        userEvent.type(input, '12aez55')
        expect(screen.getByRole('textbox')).toHaveValue('#12ae55')
    })

    test('should update color with colorPicker', () => {
        render(<ColorPicker onChange = {onColorChange} />)

        const input = screen.getByRole('textbox')
        const colorPickerCircle = screen.getByTitle('#4caf50')

        userEvent.click(colorPickerCircle)
        expect(input).toHaveValue('#4caf50')
    })
})