import { DeliverablesViewEpics } from 'Components/DeliverablesViewEpics'
import { render, screen } from 'Utilities/test-utils'

describe('<DeliverablesViewEpics />', () => {

    const epic = {
        id: 2,
        title: 'this is a title',
        description: 'this is a description',
        state: 'opened',
        webUrl: 'somelink',
        productId: 1,
        portfolioId: null
    }

    test('should render with progress indication and href', () => {
        render(<DeliverablesViewEpics epic = {epic}/>)

        expect(screen.getByText('this is a title')).toBeInTheDocument()
        expect(screen.getByTestId('HrefText__link')).toHaveAttribute('href', 'somelink')
    })
})
