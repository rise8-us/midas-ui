import { render, screen } from 'Utilities/test-utils'
import { FeedbackMessage } from './index'

describe('<FeedbackMessage />', () => {
    test('should render', () => {
        render(<FeedbackMessage message = 'test' link = 'https://www.google.com' />)

        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByTestId('FeedbackIcon')).toBeInTheDocument()
        expect(screen.getByTestId('FeedbackMessage__iconButton')).toHaveAttribute('href', 'https://www.google.com')
    })
})