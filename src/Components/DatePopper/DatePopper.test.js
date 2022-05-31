import { render, screen } from 'Utilities/test-utils'
import { DatePopper } from './index'

const initialValue = '01-01-2020'

describe('<DatePopper />', () => {
    test('should render', () => {
        const anchorEl = document.body
        render(<DatePopper isOpen = {true} setIsOpen = {e => e} handleOnChange = {e => e} handleOnClear = {e => e} anchorEl = {anchorEl}/>)

        expect(screen.getByTestId('DatePopper__wrapper')).toBeInTheDocument()
    })
})