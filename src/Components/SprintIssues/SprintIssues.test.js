import { render, screen } from 'Utilities/test-utils'
import { SprintIssues } from './index'


describe('<SprintIssues />', () => {

    const issues = [
        {
            title: 'issueTitle',
            labels: ['type::Bug'],
            webUrl: 'testUrl'
        }
    ]

    test('should render', () => {
        render(<SprintIssues />)

        expect(screen.getByText('no options available')).toBeInTheDocument()
    })

    test('should show deployed issues', () => {
        render(<SprintIssues issues = {issues}/>)

        expect(screen.getByTestId('Tag__chip')).toBeInTheDocument()
        expect(screen.getByText('issueTitle')).toBeInTheDocument()
    })

    test('should have url attached', () => {
        render(<SprintIssues issues = {issues}/>)

        expect(screen.getByTestId('HrefText__link')).toHaveAttribute('href', 'testUrl')
    })

})