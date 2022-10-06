import {
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    waitFor
} from 'Utilities/test-utils'
import { SearchEpicsDropdown } from './index'

describe('<SearchEpicsDropdown />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectProductsByPortfolioIdMock = useModuleMock('Redux/Products/selectors', 'selectProductsByPortfolioId')
    const requestFetchSearchEpicsMock = useModuleMock('Redux/Epics/actions', 'requestFetchSearchEpics')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ title: 'epic', portfolioId: 1, productId: 2 }] })
        selectPortfolioByIdMock.mockReturnValue({ id: 1, name: 'portfolio' })
        selectProductsByPortfolioIdMock.mockReturnValue([{ id: 2, name: 'product' }])
    })

    test('should render properly', async() => {
        waitFor(() => {
            requestFetchSearchEpicsMock.mockResolvedValue([])
        })

        render(<SearchEpicsDropdown
            portfolioId = {1}
            linkedEpicIds = {[]}
            handleOnSelect = {jest.fn()}
            handleOnDeselect = {jest.fn()}
        />)

        expect(await screen.findByText('portfolio')).toBeInTheDocument()
        expect(await screen.findByText('product')).toBeInTheDocument()
    })

})