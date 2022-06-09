import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductCardSprintStats } from './index'

describe('<ProductCardSprintStats />', () => {
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    test('should render', () => {
        selectProductByIdMock.mockReturnValue({ name: 'product name' })

        render(<ProductCardSprintStats productId = {1}/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
    })
})