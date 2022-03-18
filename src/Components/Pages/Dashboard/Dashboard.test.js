import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { buildCtfData, buildScopedData, combinePortfolios, combineProducts, Dashboard } from './index'

describe('<Dashboard>', () => {

    const selectAllActivePortfoliosNameAndIdsMock =
        useModuleMock('Redux/Portfolios/selectors', 'selectAllActivePortfoliosNameAndIds')

    const selectTagsByScopeMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByScope')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')
    const hasProductAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductAccess')

    const defaultText = 'Currently viewing all portfolio data. ' +
        'To view a specific portfolio select it from the list above.'

    const portfolio = {
        id: 1,
        name: 'test',
        description: 'yolo',
        products: [],
        tags: [{ id: 1 }],
        tagIds: [1]
    }

    beforeEach(() => {
        selectUserLoggedInMock.mockReturnValue({ id: 100 })

        selectAllActivePortfoliosNameAndIdsMock.mockReturnValue([{ id: 1, name: 'test' }])

        selectTagsByScopeMock.mockReturnValue([
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ])
    })

    test('should render', () => {

        render(<Dashboard />, { initialState: { app: { projectJournetMap: {} } } })

        expect(screen.getByText('Portfolios')).toBeInTheDocument()
        expect(screen.getByText('ALL')).toBeInTheDocument()
        expect(screen.getByText('test')).toBeInTheDocument()

        expect(screen.getByText('label1')).toBeInTheDocument()
        expect(screen.getByText('label2')).toBeInTheDocument()

        expect(screen.getByText(defaultText)).toBeInTheDocument()
    })

    test('should render singular portfolio', () => {
        selectPortfolioByIdMock.mockReturnValue(portfolio)

        render(<Dashboard />)

        fireEvent.click(screen.getByText('test'))

        expect(screen.getByText('yolo')).toBeInTheDocument()
    })

    test('should update description if in middle of change', async() => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioByIdMock.mockReturnValue(portfolio)
        hasProductAccessMock.mockReturnValue(true)

        const requestUpdatePortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestUpdatePortfolio')

        render(<Dashboard />)
        fireEvent.click(screen.getByText('test'))

        const el = screen.getByText('yolo')
        userEvent.type(screen.getByText('yolo'), 'new description')
        fireEvent.focusOut(el)
        fireEvent.click(screen.getByText('ALL'))

        expect(await screen.findByText(defaultText)).toBeInTheDocument()

        expect(requestUpdatePortfolioMock).toHaveBeenCalled()
    })

    test('should combine portfolios', () => {
        const portfolios = [
            {
                description: 'portfolio1',
                products: [{ id: 1 }, { id: 2 }]
            },
            {
                description: 'portfolio2',
                products: [{ id: 4 }]
            },
            {
                description: 'portfolio3',
                products: [{ id: 7 }, { id: 6 }]
            },
        ]

        const expectedResults = {
            description: '',
            products: [
                { id: 1 },
                { id: 2 },
                { id: 4 },
                { id: 7 },
                { id: 6 },
            ]
        }

        expect(combinePortfolios(portfolios)).toEqual(expectedResults)
    })

    test('should combine products', () => {
        const products = [
            { projects: [{ id: 1 }] },
            { projects: [{ id: 2 }, { id: 4 }] },
            { projects: [{ id: 3 }] },
        ]

        const expectedResults = [
            { id: 1 },
            { id: 2 },
            { id: 4 },
            { id: 3 },
        ]

        expect(combineProducts(products)).toEqual(expectedResults)
    })

    test('should generate scopedData', () => {
        const products = [
            { tagIds: [1] },
            { tagIds: [2] },
            { tagIds: [1] },
            { tagIds: [] },
        ]

        const scopedTags = [
            { id: 1, label: 'scope::label1', color: '#FFFFFF' },
            { id: 2, label: 'scope::label2', color: '#000000' },
        ]

        const expectedResults = [
            {
                title: 'scope::label1 - 2 (50%)',
                value: 50,
                color: '#FFFFFF'
            },
            {
                title: 'scope::label2 - 1 (25%)',
                value: 25,
                color: '#000000'
            },
            {
                title: 'missing tags for 1 products',
                value: 25,
                color: 'transparent'
            }
        ]

        expect(buildScopedData(products, scopedTags)).toEqual(expectedResults)
    })

    test('should generate ctfData', () => {
        const projects = [
            { projectJourneyMap: 7 },
            { projectJourneyMap: 0 },
            { projectJourneyMap: 1 },
            { projectJourneyMap: 3 },
        ]

        const ctfSteps = {
            COT: {
                name: 'COT',
                offset: 0,
            },
            GIT_PIPELINE: {
                name: 'GIT_PIPELINE',
                offset: 1,
            },
            CTF: {
                name: 'CTF',
                offset: 2,
            }
        }

        const expectedResults = [
            {
                name: 'COT',
                value: 75,
                count: 3,
                total: 4
            }, {
                name: 'GIT_PIPELINE',
                value: 50,
                count: 2,
                total: 4
            }, {
                name: 'CTF',
                value: 25,
                count: 1,
                total: 4
            }
        ]

        expect(buildCtfData(projects, ctfSteps)).toEqual(expectedResults)
    })
})