import { render, screen } from 'Utilities/test-utils'
import { DatePopper } from './index'

const defaultProps = {
    setIsOpen: e => e,
    handleOnChange: e => e,
    handleOnClear: e => e,
}

describe('<DatePopper />', () => {
    test('should render', () => {
        render(<DatePopper isOpen = {true} anchorEl = {document.body} {...defaultProps} />)

        expect(screen.getByTestId('DatePopper__wrapper')).toBeInTheDocument()
    })
})