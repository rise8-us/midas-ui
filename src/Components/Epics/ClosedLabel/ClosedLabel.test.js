import { render, screen } from 'Utilities/test-utils'
import { ClosedLabel } from './index'

describe('<ClosedLabel />', () => {

    test('should render', async() => {
        render(<ClosedLabel/>)

        screen.getByText('CLOSED')
    })
})
