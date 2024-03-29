import { render, screen } from 'Utilities/test-utils'
import { OnePagerPopup } from './index'

jest.mock('Components/ProductOnePager/ProductOnePager/ProductOnePager',
    () => (function testing() { return (<div>ProductOnePager</div>) }))

describe('<OnePagerPopup>', () => {
    test('should render', () => {
        render(<OnePagerPopup productId = {1} open onClose = {jest.fn()}/>)

        expect(screen.getByText('ProductOnePager')).toBeInTheDocument()
    })

})