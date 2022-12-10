import {
    fireEvent, mockDatePicker, mockSearchUsersComponent,
    mockSyncRequest, render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent,
    waitFor
} from 'Utilities/test-utils'
import { PortfolioPopup } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing({ title, onChange, value }) {
    return mockSearchUsersComponent({ title, onChange, value: value ?? '' })
})

jest.mock('Components/EpicSyncRequest/EpicSyncRequest', () => function testing() {
    return mockSyncRequest()
})

jest.mock('@mui/x-date-pickers', () => ({ DatePicker: mockDatePicker }))

describe('<PortfolioPopup />', () => {
    jest.setTimeout(20000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitPortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestCreatePortfolio')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const submitUpdatePortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestUpdatePortfolio')
    const selectSourceControlsMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControls')
    const selectedSourceControlMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControlById')
    const selectUsersMock = useModuleMock('Redux/Users/selectors', 'selectUsers')
    const selectProductsMock = useModuleMock('Redux/Products/selectors', 'selectProducts')

    const returnedProducts = [
        { id: 20, name: 'product 1', isArchived: false, portfolioId: 4 },
        { id: 21, name: 'product 2', isArchived: false, portfolioId: null },
    ]

    const allUsers = [
        { id: 1, name: 'user1', username: 'user1', displayName: 'User 1' },
        { id: 2, name: 'user2', username: 'user2', displayName: 'User 2' },
        { id: 3, name: 'user3', username: 'user3', displayName: 'User 3' },
        { id: 4, name: 'user4', username: 'user4', displayName: 'User 4' },
    ]

    const returnedGitlabServers = [
        { id: 23, name: 'IL9 Ultra Max Super Mega Security' },
        { id: 24, name: 'IL7 Beyond Top Secret' },
        { id: 0, name: 'test name' }
    ]

    const returnedFoundPortfolio = {
        id: 4,
        name: 'Midas Portfolio',
        products: [returnedProducts[0]],
        description: 'New Portfolio',
        isArchived: false,
        sprintStartDate: '2022-05-09',
        sprintDurationInDays: 28,
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
        sprintStartDate: '2022-06-09',
        sprintDurationInDays: 7
    }

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue(returnedNewPortfolio)
        selectSourceControlsMock.mockReturnValue(returnedGitlabServers)
        selectedSourceControlMock.mockReturnValue({})
        selectUsersMock.mockReturnValue(allUsers)
        selectProductsMock.mockReturnValue(returnedProducts)
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

        fireEvent.click(screen.getByText('create'))

        expect(submitPortfolioMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            products: [],
            gitlabGroupId: '',
            sprintStartDate: '2022-06-09',
            sprintDurationInDays: 7,
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
                    'Gitlab Group ID and Server combination already used'
                ]
            }
        }
        render(<PortfolioPopup />, { initialState: state })

        expect(await screen.findByText('portfolio name')).toBeInTheDocument()
        expect(await screen.findAllByText('Gitlab Group ID and Server combination already used')).toHaveLength(1)
    })

    test('should call onSubmit for updatePortfolio', async() => {
        waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: { id: 42, username: 'pm' } })
        })
        const newFoundPorfolio = { ...returnedFoundPortfolio, products: [], personnel: { ownerId: 1 } }
        selectPortfolioByIdMock.mockReturnValue(newFoundPorfolio)
        selectedSourceControlMock.mockReturnValue({ id: 0, name: 'test name' })

        render(<PortfolioPopup id = {4} />)

        const name = 'My Edited Portfolio'
        const description = 'New description'
        const gitlabGroupId = '123'
        const newDuration = '85'

        const nameInput = screen.getByTestId('PortfolioPopup__input-title')
        const descriptionInput = screen.getByTestId('PortfolioPopup__input-description')
        const gitlabGroupIdInput = screen.getByTestId('PortfolioPopup__input-gitlabGroupId')
        const sprintDurationInDays = screen.getByTestId('PortfolioPopup__input-sprint-duration')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)
        userEvent.clear(sprintDurationInDays)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)
        userEvent.type(sprintDurationInDays, newDuration)

        fireEvent.change(screen.getByDisplayValue('2022-05-09'), { target: { value: '11-01-2022' } })

        fireEvent.click(screen.getAllByTitle(/open/i)[0])
        fireEvent.click(screen.getByText('IL7 Beyond Top Secret'))

        fireEvent.click(screen.getAllByTitle(/open/i)[1])
        fireEvent.click(screen.getByText('product 2'))

        fireEvent.click(screen.getByText('update'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...newFoundPorfolio,
            name,
            description,
            gitlabGroupId: '123',
            sprintDurationInDays: '85',
            sprintStartDate: '2022-11-01',
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
        fireEvent.click(screen.getByText('update'))

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

        userEvent.click(screen.getAllByTestId('ArrowDropDownIcon')[2])
        userEvent.click(screen.getByText('User 1'))
        userEvent.click(screen.getAllByTestId('CancelIcon')[1])
        userEvent.click(screen.getAllByTestId('ArrowDropDownIcon')[2])
        userEvent.click(screen.getByText('User 2'))
        fireEvent.click(screen.getByText('update'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...returnedFoundPortfolio,
            gitlabGroupId: '',
            sourceControlId: null,
            productIds: [20],
            personnel: {
                ownerId: null,
                teamIds: [],
                adminIds: [2]
            }
        })
    })
})
