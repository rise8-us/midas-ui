import {
    render,
    screen,
    userEvent
} from 'Utilities/test-utils'
import { CollapsableRow } from './index'

describe('<CollapsableRow />', () => {

    test('should render properly', async() => {
        render(<CollapsableRow typeText = 'Portfolio' headerText = 'Header Text'>
            <div>Hello World</div>
        </CollapsableRow>)

        expect(screen.getByText('Portfolio')).toBeInTheDocument()
        expect(screen.getByText('Header Text')).toBeInTheDocument()

        expect(screen.getByTestId('Collapsable__card')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('Collapsable__card'))

        expect(await screen.findByText('Hello World')).toBeInTheDocument()
    })

})