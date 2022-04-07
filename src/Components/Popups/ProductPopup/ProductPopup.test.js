import {
    fireEvent,
    mockProductConfigurationFields,
    mockSearchUsersComponent,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { ProductPopup } from './index'

jest.mock('Components/Search/SearchUsers/SearchUsers', () => function testing({ title, onChange }) {
    return mockSearchUsersComponent({ title, onChange })
})

jest.mock('Components/ProductConfigurationFields/ProductConfigurationFields', () => function testing(props) {
    return mockProductConfigurationFields(props)
})

describe('<ProductPopup />', () => {
    jest.setTimeout(60000)

    const selectRequestErrorsMock = useModuleMock('Redux/Errors/selectors', 'selectRequestErrors')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateProductMock = useModuleMock('Redux/Products/actions', 'requestCreateProduct')
    const submitUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

    const existingProduct = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        personnel: {
            ownerId: null,
            teamIds: [1],
            adminIds: []
        },
        tagIds: [4, 13],
        tags: [],
        projects: [],
        gitlabGroupId: 1,
        sourceControlId: 10,
    }

    const newProduct = {
        name: '',
        description: '',
        tagIds: [],
        tags: [],
        projects: [],
        personnel: {
            ownerId: null,
            teamIds: [],
            adminIds: []
        }
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue()
        selectProductByIdMock.mockReturnValue(existingProduct)
        selectRequestErrorsMock.mockReturnValue([])
    })

    test('should render properly', () => {
        selectProductByIdMock.mockReturnValue(newProduct)

        render(<ProductPopup />)

        expect(screen.getByText('Create Product')).toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<ProductPopup />)

        fireEvent.click(screen.getByText('cancel'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        selectRequestErrorsMock.mockReturnValue(['product name'])

        render(<ProductPopup/>)

        expect(screen.getByText('product name')).toBeInTheDocument()
    })

    test('should call onSubmit', () => {
        selectProductByIdMock.mockReturnValue(newProduct)

        render(<ProductPopup />)

        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateProductMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            vision: undefined,
            mission: undefined,
            problemStatement: undefined,
            tags: [],
            tagIds: [],
            personnel: {
                ownerId: null,
                teamIds: [],
                adminIds: []
            },
            projects: [],
            projectIds: [],
            gitlabGroupId: null,
            sourceControlId: null,
            roadmapType: 'MANUAL'
        })
    })

    test('should call onSubmit for updateProduct', () => {
        render(<ProductPopup id = {4} />)

        const name = 'My Edited Product'
        const description = 'New description'
        const vision = 'vision'
        const mission = 'mission'
        const problemStatement = 'problem'

        const nameInput = screen.getByTestId('ProductPopup__input-name')
        const descriptionInput = screen.getByTestId('ProductPopup__input-description')
        const visionInput = screen.getByTestId('ProductPopup__input-vision')
        const missionInput = screen.getByTestId('ProductPopup__input-mission')
        const problemInput = screen.getByTestId('ProductPopup__input-problem')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)
        userEvent.clear(visionInput)
        userEvent.clear(missionInput)
        userEvent.clear(problemInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)
        userEvent.type(visionInput, vision)
        userEvent.type(missionInput, mission)
        userEvent.type(problemInput, problemStatement)

        userEvent.type(screen.getByPlaceholderText('tags'), 'a')
        userEvent.type(screen.getByPlaceholderText('team'), 'b')
        userEvent.type(screen.getByPlaceholderText('projects'), 'c')
        userEvent.type(screen.getByPlaceholderText('srcc'), 'd')
        userEvent.type(screen.getByPlaceholderText('group'), 'e')
        userEvent.type(screen.getByPlaceholderText('roadmaptype'), 'f')

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateProductMock).toHaveBeenCalledWith({
            ...existingProduct,
            name,
            description,
            vision,
            mission,
            personnel: {
                ownerId: null,
                teamIds: [20],
                adminIds: []
            },
            problemStatement,
            roadmapType: 'roadmaptype',
            gitlabGroupId: 50,
            tagIds: [10],
            projectIds: [30],
            sourceControlId: 40,
        })
    })

    test('should handle owner', async() => {
        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, username: 'pm' }] })
        selectProductByIdMock.mockReturnValue({ ...existingProduct,
            personnel: {
                ownerId: 99,
                teamIds: [],
                adminIds: []
            } })

        render(<ProductPopup id = {4} />)

        const owner = await screen.findByTitle('Product Owner')
        userEvent.clear(owner)
        userEvent.type(owner, 'foo')

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateProductMock).toHaveBeenCalledWith({
            ...existingProduct,
            vision: undefined,
            mission: undefined,
            problemStatement: undefined,
            tags: [],
            tagIds: [],
            personnel: {
                ownerId: 24,
                teamIds: [],
                adminIds: []
            },
            projects: [],
            projectIds: [],
            gitlabGroupId: null,
            sourceControlId: null,
            roadmapType: 'MANUAL',
        })
    })
})