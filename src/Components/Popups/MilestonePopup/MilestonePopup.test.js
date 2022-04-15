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
import { MilestonePopup } from './index'

describe('<MilestonePopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateMilestoneMock = useModuleMock('Redux/Milestones/actions', 'requestCreateMilestone')
    const submitUpdateMilestoneMock = useModuleMock('Redux/Milestones/actions', 'requestUpdateMilestone')
    const getMilestoneByIdMock = useModuleMock('Redux/Milestones/selectors', 'selectMilestoneById')

    jest.mock('Components/DateSelector/DateSelector', () => function testing(props) { return mockDateSelector(props) })

    const returnedFoundMilestone = {
        id: 4,
        title: 'My Milestone',
        description: 'Description',
        dueDate: '2022-01-07',
        portfolioId: 1
    }

    const returnedNewMilestone = {
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
        getMilestoneByIdMock.mockReturnValue(returnedNewMilestone)
    })

    test('should render properly', () => {

        render(<MilestonePopup id = {4} portfolioId = {1}/>)

        expect(screen.getByText('Create Milestone')).toBeInTheDocument()
        expect(screen.getByTestId('MilestonePopup__input-title')).toBeInTheDocument()
        expect(screen.getByTestId('MilestonePopup__input-description')).toBeInTheDocument()
        expect(screen.getByText('Due Date')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'milestone/create': [
                    'title',
                ]
            }
        }
        render(<MilestonePopup portfolioId = {1} />, { initialState: state })

        expect(screen.getByText('title')).toBeInTheDocument()
    })

    test('should call onSubmit for createMilestone', () => {
        const createData = {
            title: 'This is a title',
            description: 'This is a description',
            dueDate: '',
            portfolioId: 1
        }
        render(<MilestonePopup portfolioId = {1} />)

        const titleInput = within(screen.getByTestId('MilestonePopup__input-title'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('MilestonePopup__input-description'))
            .getByRole('textbox')

        userEvent.type(titleInput, createData.title)
        userEvent.type(descriptionInput, createData.description)
        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateMilestoneMock).toHaveBeenCalledWith({ ...createData })
    })

    test('should call onSubmit for updateMilestone', () => {
        getMilestoneByIdMock.mockReturnValue(returnedFoundMilestone)
        render(<MilestonePopup id = {4} portfolioId = {1} />)

        const titleInput = screen.getByDisplayValue('My Milestone')
        const descriptionInput = screen.getByDisplayValue('Description')

        userEvent.clear(descriptionInput)
        userEvent.clear(titleInput)

        userEvent.type(descriptionInput, updatedData.description)
        userEvent.type(titleInput, updatedData.title)

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateMilestoneMock).toHaveBeenCalledWith({ ...returnedFoundMilestone, ...updatedData })
    })

    test('should close popup', () => {
        render(<MilestonePopup portfolioId = {1} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})