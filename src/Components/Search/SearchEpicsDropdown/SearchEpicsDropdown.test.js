import {
    render,
    screen,
    useDispatchMock,
    useModuleMock
} from 'Utilities/test-utils'
import { SearchEpicsDropdown } from './index'

describe('<SearchEpicsDropdown />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectProductsByPortfolioIdMock = useModuleMock('Redux/Products/selectors', 'selectProductsByPortfolioId')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ title: 'epic', portfolioId: 1, productId: 2 }] })
        selectPortfolioByIdMock.mockReturnValue({ id: 1, name: 'portfolio' })
        selectProductsByPortfolioIdMock.mockReturnValue([{ id: 2, name: 'product' }])
    })

    test('should render properly', async() => {
        render(<SearchEpicsDropdown
            portfolioId = {1}
            linkedEpicIds = {[]}
            handleOnSelect = {jest.fn()}
            handleOnDeselect = {jest.fn()}
        />)

        expect(await screen.findByText('portfolio')).toBeInTheDocument()
        expect(screen.getByText('product')).toBeInTheDocument()
    })

})