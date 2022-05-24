import {
    fireEvent, mockSearchEpicsComponent,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { AssociatedEpicsPopup } from './index'

jest.mock('Components/Search/SearchEpics/SearchEpics', () => function testing(props) {
    return mockSearchEpicsComponent(props)
})

describe('<AssociatedEpicsPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    test('should render properly', () => {
        render(<AssociatedEpicsPopup onSelect = {jest.fn}/>)

        expect(screen.getByText('Add Epics')).toBeInTheDocument()
        expect(screen.getByText('close')).toBeInTheDocument()
        expect(screen.queryByText('* are Required')).not.toBeInTheDocument()
    })

    test('should close popup', () => {
        useDispatchMock().mockReturnValue({})

        render(<AssociatedEpicsPopup onSelect = {jest.fn} />)
        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should handle onSelect', () => {
        const onSelectMock = jest.fn()

        render(<AssociatedEpicsPopup onSelect = {onSelectMock} />)
        userEvent.type(screen.getByTitle('searchEpicsMock'), 'a')

        expect(onSelectMock).toHaveBeenCalledWith([20])
    })

})