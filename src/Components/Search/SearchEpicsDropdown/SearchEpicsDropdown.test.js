import {
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    waitFor
} from 'Utilities/test-utils'
import { SearchEpicsDropdown } from './index'
import { within } from '@testing-library/dom'

describe('<SearchEpicsDropdown />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectProductsByPortfolioIdMock = useModuleMock('Redux/Products/selectors', 'selectProductsByPortfolioId')
    const requestFetchSearchEpicsMock = useModuleMock('Redux/Epics/actions', 'requestFetchSearchEpics')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ title: 'epic', portfolioId: 1, productId: null }] })
        selectPortfolioByIdMock.mockReturnValue({ id: 1, name: 'portfolio' })
        selectProductsByPortfolioIdMock.mockReturnValue([{ id: 2, name: 'product' }])
    })

    test('should render properly', async() => {
        waitFor(() => {
            requestFetchSearchEpicsMock.mockResolvedValue([])
        })

        render(<SearchEpicsDropdown
            portfolioId = {1}
            selectedEpicIds = {[]}
            handleOnSelect = {jest.fn()}
            handleOnDeselect = {jest.fn()}
        />)

        expect(await screen.findByText('portfolio')).toBeInTheDocument()
        expect(await screen.findByText('product')).toBeInTheDocument()
        expect(await screen.findByText('epic')).toBeInTheDocument()
        expect(await screen.findByText('No Epics Found')).toBeInTheDocument()
    })

    test('should sort epics alphabetically and by state', async() => {
        useDispatchMock().mockResolvedValue({
            payload: [
                { title: 'closed epic', portfolioId: 1, productId: null, state: 'closed' },
                { title: 'open epic', portfolioId: 1, productId: null, state: 'open' },
                { title: 'a great epic', portfolioId: 1, productId: null, state: 'open' },
            ]
        })

        waitFor(() => {
            requestFetchSearchEpicsMock.mockResolvedValue([])
        })

        render(<SearchEpicsDropdown
            portfolioId = {1}
            selectedEpicIds = {[]}
            handleOnSelect = {jest.fn()}
            handleOnDeselect = {jest.fn()}
        />)

        const epics = await screen.findAllByTestId('EpicListItem__label')

        within(epics[0]).getByText('a great epic')
        within(epics[1]).getByText('open epic')
        within(epics[2]).getByText('closed epic')
    })
})
