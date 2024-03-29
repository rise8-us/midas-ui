import { fireEvent, render, screen } from 'Utilities/test-utils'
import { LabelTooltip } from './index'

describe('<LabelTooltip>', () => {

    test('should render with tooltip text when clicked', async() => {
        render(<LabelTooltip text = 'text' tooltipProps = {{ title: 'tooltip text' }} />)

        screen.getByTestId('LabelTooltip__icon')
        screen.getByText('text')

        fireEvent.mouseEnter(screen.getByTestId('LabelTooltip__icon'))
        expect(screen.queryByText('tooltip text')).not.toBeInTheDocument()

        fireEvent.click(screen.getByTestId('LabelTooltip__icon'))
        screen.getByText('tooltip text')
    })

    test('should not render icon with no tooltipProps', () => {
        render(<LabelTooltip text = 'text'/>)

        screen.getByText('text')
        expect(screen.queryByTestId('LabelTooltip__icon')).not.toBeInTheDocument()
    })

    test('should not render icon without tooltipProps.text', () => {
        render(<LabelTooltip text = 'text' tooltipProps = {{ placement: 'bottom' }} />)

        expect(screen.queryByTestId('LabelTooltip__icon')).not.toBeInTheDocument()
    })

    test('should not render icon if tooltipProps.text falsy', () => {
        render(<LabelTooltip text = 'text' tooltipProps = {{ text: '' }} />)

        expect(screen.queryByTestId('LabelTooltip__icon')).not.toBeInTheDocument()
    })
})
