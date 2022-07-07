import {
    fireEvent, mockSearchUsersComponent, render, screen, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { excludeUserIds, TeamPopup } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing({ title, onChange }) {
    return mockSearchUsersComponent({ title, onChange })
})

describe('<TeamPopup />', () => {
    jest.setTimeout(60000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateTeamMock = useModuleMock('Redux/Teams/actions', 'requestCreateTeam')
    const submitUpdateTeamMock = useModuleMock('Redux/Teams/actions', 'requestUpdateTeam')
    const selectTeamByIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamById')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

    const returnedFoundTeam = {
        id: 4,
        name: 'My Team',
        description: '',
        productManagerId: 10,
        designerId: 10,
        techLeadId: 10,
        userIds: [9],
    }

    const returnedNewTeam = {
        name: '',
        description: '',
        productManagerId: null,
        designerId: null,
        techLeadId: null,
        userIds: [],
    }

    const returnedProduct = {
        personnel: {
            ownerId: null
        }
    }

    beforeEach(async() => {
        useDispatchMock().mockReturnValue({})
        selectTeamByIdMock.mockReturnValue(returnedNewTeam)
        selectProductByIdMock.mockReturnValue(returnedProduct)
    })

    test('should render properly for createTeam', () => {
        render(<TeamPopup />)

        expect(screen.getByText('Create Team')).toBeInTheDocument()
    })

    test('should render properly for updateTeam', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [
            {
                id: 10,
                username: 'byoda'
            }
        ] })
        selectTeamByIdMock.mockReturnValue(returnedFoundTeam)
        selectProductByIdMock.mockReturnValue({ ownerId: 10 })

        render(<TeamPopup id = {4}/>)

        expect(await screen.findByText('Update Team')).toBeInTheDocument()
    })

    test('should display error messages', async() => {
        const state = {
            errors: {
                'teams/createOne': [
                    'name error'
                ]
            }
        }
        render(<TeamPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should call onSubmit to create team', () => {
        render(<TeamPopup/>)

        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateTeamMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            productManagerId: null,
            designerId: null,
            techLeadId: null,
            userIds: [],
            productIds: [],
        })
    })

    test('should call onSubmit to update team without ProductOwner', async() => {
        selectTeamByIdMock.mockReturnValue({ ...returnedNewTeam, id: 4, userIds: [9] })
        useDispatchMock().mockResolvedValue({ type: '/', payload: [
            {
                id: 10,
                username: 'jsmith'
            }
        ] })

        render(<TeamPopup id = {4}/>)

        const name = 'My Edited Team'

        const nameInput = screen.getByTestId('TeamPopup__input-name')
        userEvent.clear(nameInput)
        userEvent.type(nameInput, name)

        for (let i = 0; i < 4; i++) {
            userEvent.type(screen.getAllByPlaceholderText('username, display name, or email')[i], 'jsmith')
        }

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateTeamMock).toHaveBeenCalledWith({
            ...returnedFoundTeam,
            productIds: [],
            name,
            productManagerId: 24,
            designerId: 24,
            techLeadId: 24,
            userIds: [9, 24]
        })

    })


    test('should call onSubmit to update team with ProductOwner', async() => {
        selectTeamByIdMock.mockReturnValue({ ...returnedNewTeam, id: 4, userIds: [9] })
        useDispatchMock().mockResolvedValue({ type: '/', payload: [
            {
                id: 10,
                username: 'jsmith'
            }
        ] })

        render(<TeamPopup id = {4} productIds = {[24]} />)

        const name = 'My Edited Team'

        const nameInput = screen.getByTestId('TeamPopup__input-name')
        userEvent.clear(nameInput)
        userEvent.type(nameInput, name)

        for (let i = 0; i < 4; i++) {
            userEvent.type(screen.getAllByPlaceholderText('username, display name, or email')[i], 'jsmith')
        }

        fireEvent.click(screen.getByText('submit'))

        expect(screen.getByTitle('Product Owner'))
        expect(submitUpdateTeamMock).toHaveBeenCalledWith({
            ...returnedFoundTeam,
            productIds: [24],
            name,
            productManagerId: 24,
            designerId: 24,
            techLeadId: 24,
            userIds: [9, 24]
        })

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...returnedProduct,
            personnel: { ...returnedProduct.personnel, ownerId: 24 },
            childIds: []
        })
    })


    test('should close popup', () => {
        render(<TeamPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should filter excludeids from userids', () => {
        expect(excludeUserIds([1, 2, 3], [1, 2])).toEqual([3])
    })
})