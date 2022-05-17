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
import { TargetPopup } from './index'

describe('<TargetPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateTargetMock = useModuleMock('Redux/Targets/actions', 'requestCreateTarget')
    const submitUpdateTargetMock = useModuleMock('Redux/Targets/actions', 'requestUpdateTarget')
    const getTargetByIdMock = useModuleMock('Redux/Targets/selectors', 'selectTargetById')

    jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })

    const returnedFoundTarget = {
        id: 4,
        title: 'My Target',
        description: 'Description',
        startDate: '2022-01-01',
        dueDate: '2022-01-07',
        portfolioId: 1
    }

    const returnedNewTarget = {
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        portfolioId: null
    }

    const updatedData = {
        title: 'foobar',
        description: 'sassafras',
        startDate: '2022-01-01',
        dueDate: '2022-01-07',
        portfolioId: 1
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getTargetByIdMock.mockReturnValue(returnedNewTarget)
    })

    test('should render properly', () => {
        render(<TargetPopup portfolioId = {1}/>)

        expect(screen.getByText('Create Target')).toBeInTheDocument()
        expect(screen.getByTestId('TargetPopup__input-title')).toBeInTheDocument()
        expect(screen.getByTestId('TargetPopup__input-description')).toBeInTheDocument()
        expect(screen.getByText('Start Date')).toBeInTheDocument()
        expect(screen.getByText('Due Date')).toBeInTheDocument()
    })

    test('should render with disabledDates and title', () => {
        render(<TargetPopup id = {4} portfolioId = {1} disableDates title = 'foo'/>)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.queryByText('Start Date')).not.toBeInTheDocument()
        expect(screen.queryByText('Due Date')).not.toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'target/create': [
                    'title',
                ]
            }
        }
        render(<TargetPopup portfolioId = {1} />, { initialState: state })

        expect(screen.getByText('title')).toBeInTheDocument()
    })

    test('should call onSubmit for createTarget', () => {
        const createData = {
            title: 'This is a title',
            description: 'This is a description',
            startDate: '',
            dueDate: '',
            portfolioId: 1
        }
        render(<TargetPopup portfolioId = {1} />)

        const titleInput = within(screen.getByTestId('TargetPopup__input-title'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('TargetPopup__input-description'))
            .getByRole('textbox')

        userEvent.type(titleInput, createData.title)
        userEvent.type(descriptionInput, createData.description)
        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateTargetMock).toHaveBeenCalledWith({ ...createData })
    })

    test('should call onSubmit for updateTarget', () => {
        getTargetByIdMock.mockReturnValue(returnedFoundTarget)
        render(<TargetPopup id = {4} portfolioId = {1} />)

        const titleInput = screen.getByDisplayValue('My Target')
        const descriptionInput = screen.getByDisplayValue('Description')

        userEvent.clear(descriptionInput)
        userEvent.clear(titleInput)

        userEvent.type(descriptionInput, updatedData.description)
        userEvent.type(titleInput, updatedData.title)

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateTargetMock).toHaveBeenCalledWith({ ...returnedFoundTarget, ...updatedData })
    })

    test('should close popup', () => {
        render(<TargetPopup portfolioId = {1} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})