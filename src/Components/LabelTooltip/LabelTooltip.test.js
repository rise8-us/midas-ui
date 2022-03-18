import { fireEvent, render, screen } from 'Utilities/test-utils'
import { LabelTooltip } from './index'

describe('<LabelTooltip>', () => {

    test('should render with tooltip text', async() => {
        render(<LabelTooltip text = 'text' tooltipProps = {{ title: 'tooltip text' }} />)

        fireEvent.mouseEnter(screen.getByTestId('LabelTooltip__icon'))

        expect(screen.getByTestId('LabelTooltip__icon')).toBeInTheDocument()
        expect(screen.getByText('text')).toBeInTheDocument()
        expect(await screen.findByText('tooltip text')).toBeInTheDocument()
    })

    test('should not render icon with no tooltipProps', () => {
        render(<LabelTooltip text = 'text'/>)

        expect(screen.getByText('text')).toBeInTheDocument()
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