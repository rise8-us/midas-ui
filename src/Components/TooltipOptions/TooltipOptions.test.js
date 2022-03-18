import { render, screen, userEvent } from 'Utilities/test-utils'
import { TooltipOptions } from './index'

describe('<TooltipOptions />', () => {

    const options = [
        { title: 'hello world', value: 'helloWorld', checked: true },
        { title: 'foo bar', value: 'fooBar' },
    ]

    test('should render', () => {
        render(<TooltipOptions title = 'test' options = {options} onChange = {jest.fn()}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByText('hello world')).toBeInTheDocument()
        expect(screen.getByText('foo bar')).toBeInTheDocument()
        expect(screen.getByTestId('TooltipOptions__checkbox-0')).toBeChecked()
        expect(screen.getByTestId('TooltipOptions__checkbox-1')).not.toBeChecked()
    })

    test('should handle onChange', () => {
        const onChangeMock = jest.fn()

        render(<TooltipOptions title = 'test' options = {options} onChange = {onChangeMock}/>)

        userEvent.click(screen.getByText('foo bar'))

        expect(onChangeMock).toHaveBeenCalledWith('fooBar', true)
        expect(screen.getByTestId('TooltipOptions__checkbox-0')).not.toBeChecked()
        expect(screen.getByTestId('TooltipOptions__checkbox-1')).toBeChecked()
    })

    test('should handle multiple', () => {
        render(<TooltipOptions title = 'test' options = {options} onChange = {jest.fn()} multiple/>)

        userEvent.click(screen.getByText('foo bar'))

        expect(screen.getByTestId('TooltipOptions__checkbox-0')).toBeChecked()
        expect(screen.getByTestId('TooltipOptions__checkbox-1')).toBeChecked()
    })
})