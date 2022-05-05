import {
    fireEvent,
    mockDateSelector,
    mockUsersCollectionComponent,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent,
    within
} from 'Utilities/test-utils'
import { EventPopup } from './index'

jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })
jest.mock('Components/UsersCollection/UsersCollection', () => function testing(props) {
    return mockUsersCollectionComponent(props)
})

describe('<EventPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateEventMock = useModuleMock('Redux/Events/actions', 'requestCreateEvent')
    const submitUpdateEventMock = useModuleMock('Redux/Events/actions', 'requestUpdateEvent')
    const getEventByIdMock = useModuleMock('Redux/Events/selectors', 'selectEventById')

    const returnedFoundEvent = {
        id: 4,
        title: 'My Event',
        description: 'Description',
        startDate: '2022-01-01',
        dueDate: '2022-01-07',
        portfolioId: 1,
        location: 'a location',
        organizerIds: [],
        attendeeIds: []
    }

    const returnedNewEvent = {
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        portfolioId: null,
        location: '',
        organizerIds: [],
        attendeeIds: []
    }

    const updatedData = {
        title: 'foobar',
        description: 'sassafras',
        startDate: '2022-01-01',
        dueDate: '2022-01-07',
        portfolioId: 1,
        location: 'a location',
        organizerIds: [],
        attendeeIds: []
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getEventByIdMock.mockReturnValue(returnedNewEvent)
    })

    test('should render properly', () => {

        render(<EventPopup id = {4} portfolioId = {1}/>)

        expect(screen.getByText('Create Event')).toBeInTheDocument()
        expect(screen.getByTestId('EventPopup__input-title')).toBeInTheDocument()
        expect(screen.getByTestId('EventPopup__input-description')).toBeInTheDocument()
        expect(screen.getByText('Start Date')).toBeInTheDocument()
        expect(screen.getByText('Due Date')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'event/create': [
                    'title',
                ]
            }
        }
        render(<EventPopup portfolioId = {1} />, { initialState: state })

        expect(screen.getByText('title')).toBeInTheDocument()
    })

    test('should call onSubmit for createEvent', () => {
        render(<EventPopup portfolioId = {1} />)

        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateEventMock).toHaveBeenCalledWith({
            title: '',
            description: '',
            startDate: '',
            dueDate: '',
            portfolioId: 1,
            location: '',
            organizerIds: [],
            attendeeIds: []
        })
    })

    test('should call onSubmit for updateEvent', () => {
        getEventByIdMock.mockReturnValue(returnedFoundEvent)
        render(<EventPopup id = {4} portfolioId = {1} />)

        const titleInput = within(screen.getByTestId('EventPopup__input-title'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('EventPopup__input-description'))
            .getByRole('textbox')
        const locationInput = within(screen.getByTestId('EventPopup__input-location'))
            .getByRole('textbox')

        userEvent.clear(titleInput)
        userEvent.clear(descriptionInput)
        userEvent.clear(locationInput)

        userEvent.type(titleInput, updatedData.title)
        userEvent.type(descriptionInput, updatedData.description)
        userEvent.type(locationInput, updatedData.location)

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateEventMock).toHaveBeenCalledWith({ ...returnedFoundEvent, ...updatedData })
    })

    test('should close popup', () => {
        render(<EventPopup portfolioId = {1} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})