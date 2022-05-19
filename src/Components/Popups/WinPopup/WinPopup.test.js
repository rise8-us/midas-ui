import {
    fireEvent,
    mockDateSelector,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent,
    within
} from 'Utilities/test-utils'
import { WinPopup } from './index'

jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })

describe('<WinPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateWinMock = useModuleMock('Redux/Wins/actions', 'requestCreateWin')
    const submitUpdateWinMock = useModuleMock('Redux/Wins/actions', 'requestUpdateWin')
    const getWinByIdMock = useModuleMock('Redux/Wins/selectors', 'selectWinById')

    const returnedFoundWin = {
        id: 4,
        title: 'My Win',
        description: 'Description',
        dueDate: '2022-01-07',
        portfolioId: 1
    }

    const returnedNewWin = {
        title: '',
        description: '',
        dueDate: '',
        portfolioId: null
    }

    const updatedData = {
        title: 'foobar',
        description: 'sassafras',
        dueDate: '2022-01-07',
        portfolioId: 1
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getWinByIdMock.mockReturnValue(returnedNewWin)
    })

    test('should render properly', () => {
        render(<WinPopup id = {4} portfolioId = {1}/>)

        expect(screen.getByText('Create Win')).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Date')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'win/create': [
                    'title',
                ]
            }
        }
        render(<WinPopup portfolioId = {1} />, { initialState: state })

        expect(screen.getByText('title')).toBeInTheDocument()
    })

    test('should call onSubmit for createWin', () => {
        const createData = {
            title: 'This is a title',
            description: 'This is a description',
            dueDate: '',
            portfolioId: 1
        }
        render(<WinPopup portfolioId = {1} />)

        const titleInput = within(screen.getByTestId('WinPopup__input-title'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('WinPopup__input-description'))
            .getByRole('textbox')

        userEvent.type(titleInput, createData.title)
        userEvent.type(descriptionInput, createData.description)
        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateWinMock).toHaveBeenCalledWith({ ...createData })
    })

    test('should call onSubmit for updateWin', () => {
        getWinByIdMock.mockReturnValue(returnedFoundWin)
        render(<WinPopup id = {4} portfolioId = {1} />)

        const titleInput = screen.getByDisplayValue('My Win')
        const descriptionInput = screen.getByDisplayValue('Description')

        userEvent.clear(descriptionInput)
        userEvent.clear(titleInput)

        userEvent.type(descriptionInput, updatedData.description)
        userEvent.type(titleInput, updatedData.title)

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateWinMock).toHaveBeenCalledWith({ ...returnedFoundWin, ...updatedData })
    })

    test('should close popup', () => {
        render(<WinPopup portfolioId = {1} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})