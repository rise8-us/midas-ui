import {
    fireEvent,
    mockSearchUsersComponent,
    mockUsersCollectionComponent,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { PortfolioPopup } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing({ title, onChange }) {
    return mockSearchUsersComponent({ title, onChange })
})

jest.mock('Components/UsersCollection/UsersCollection', () => function testing({ title, setUserIds }) {
    return mockUsersCollectionComponent({ title, setUserIds })
})

describe('<PortfolioPopup />', () => {
    jest.setTimeout(20000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitPortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestCreatePortfolio')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const submitUpdatePortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestUpdatePortfolio')
    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')
    const selectAvailableProductsMock = useModuleMock('Redux/Products/selectors', 'selectAvailableProducts')
    const selectSourceControlsMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControls')
    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')

    const returnedTags = [
        { id: 4, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProducts = [
        { id: 20, name: 'product 1' },
        { id: 21, name: 'product 2' },
    ]

    const returnedGitlabServers = [
        { id: 23, name: 'IL9 Ultra Max Super Mega Security' },
        { id: 24, name: 'IL7 Beyond Top Secret' }
    ]

    const returnedFoundPortfolio = {
        id: 4,
        name: 'Midas Portfolio',
        products: [returnedProducts[0]],
        description: 'New Portfolio',
        isArchived: false,
        personnel: {
            teamIds: [],
            ownerId: null,
            adminIds: []
        }
    }

    const returnedNewPortfolio = {
        name: '',
        description: '',
        products: [],
    }

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue(returnedNewPortfolio)
        selectTagsByTypesMock.mockReturnValue(returnedTags)
        selectAvailableProductsMock.mockReturnValue(returnedProducts)
        selectSourceControlsMock.mockReturnValue(returnedGitlabServers)
        selectUsersByIdsMock.mockReturnValue([])
        useDispatchMock().mockResolvedValue({ type: '/', payload: [] })
    })

    test('should render properly', () => {
        render(<PortfolioPopup />)

        expect(screen.getByText('Create Portfolio')).toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<PortfolioPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should call onSubmit', () => {
        render(<PortfolioPopup />)

        fireEvent.click(screen.getByText('submit'))

        expect(submitPortfolioMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            products: [],
            gitlabGroupId: '',
            sourceControlId: null,
            productIds: [],
            personnel: {
                teamIds: [],
                ownerId: null,
                adminIds: []
            },
        })
    })

    test('should display error messages', async() => {
        const state = {
            errors: {
                'portfolios/createOne': [
                    'portfolio name',
                ]
            }
        }
        render(<PortfolioPopup />, { initialState: state })

        expect(await screen.findByText('portfolio name')).toBeInTheDocument()
    })

    test('should call onSubmit for updatePortfolio', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: { id: 42, username: 'pm' } })
        const newFoundPorfolio = { ...returnedFoundPortfolio, products: [] }
        selectPortfolioByIdMock.mockReturnValue(newFoundPorfolio)

        render(<PortfolioPopup id = {4} />)

        const name = 'My Edited Portfolio'
        const description = 'New description'
        const gitlabGroupId = '123'

        const nameInput = screen.getByTestId('PortfolioPopup__input-name')
        const descriptionInput = screen.getByTestId('PortfolioPopup__input-description')
        const gitlabGroupIdInput = screen.getByTestId('PortfolioPopup__input-gitlabGroupId')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)

        fireEvent.click(screen.getAllByTitle(/open/i)[0])
        fireEvent.click(screen.getByText('IL7 Beyond Top Secret'))

        fireEvent.click(screen.getAllByTitle(/open/i)[1])
        fireEvent.click(screen.getByText('product 2'))

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...newFoundPorfolio,
            name,
            description,
            gitlabGroupId: '123',
            sourceControlId: 24,
            productIds: [21],
            personnel: {
                adminIds: [],
                teamIds: [],
                ownerId: null,
            }
        })
    })

    test('should handle owner', () => {
        selectPortfolioByIdMock.mockReturnValue({ ...returnedFoundPortfolio })

        render(<PortfolioPopup id = {4} />)

        userEvent.type(screen.getByTitle('Portfolio Owner'), 'bogus')
        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...returnedFoundPortfolio,
            gitlabGroupId: '',
            sourceControlId: null,
            productIds: [20],
            personnel: {
                ownerId: 24,
                teamIds: [],
                adminIds: []
            }
        })
    })

    test('should handle portfolio admins', () => {
        selectPortfolioByIdMock.mockReturnValue({ ...returnedFoundPortfolio })

        render(<PortfolioPopup id = {4} />)

        userEvent.type(screen.getByTitle('Portfolio Admins'), 'bogus')
        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...returnedFoundPortfolio,
            gitlabGroupId: '',
            sourceControlId: null,
            productIds: [20],
            personnel: {
                ownerId: null,
                teamIds: [],
                adminIds: [24]
            }
        })
    })
})