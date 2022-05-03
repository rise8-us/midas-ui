import { render, screen } from 'Utilities/test-utils'
import { HrefText } from './index'

describe('<HrefText />', () => {

    test('should render with href', () => {
        render(<HrefText text = 'foo' href = 'bar'/>)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByTestId('HrefTitle__link')).toHaveAttribute('href', 'bar')
    })

    test('should render with no href', () => {
        render(<HrefText text = 'foo'/>)

        expect(screen.queryByTestId('HrefTitle__link')).not.toBeInTheDocument()
    })
})