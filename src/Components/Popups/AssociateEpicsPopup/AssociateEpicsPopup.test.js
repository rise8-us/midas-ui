import {
    fireEvent, render,
    screen, useDispatchMock, useModuleMock
} from 'Utilities/test-utils'
import { AssociatedEpicsPopup } from './index'

jest.mock('Components/Search/SearchEpicsDropdown/SearchEpicsDropdown', () => function testing() {
    return <div>SearchEpicsDropdown</div>
})

describe('<AssociatedEpicsPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    beforeEach(() => {
        useDispatchMock()
    })

    test('should render properly', async() => {
        render(<AssociatedEpicsPopup onSelectEpic = {jest.fn()} targetId = {0}/>)

        expect(await screen.findByText('Associate Epics')).toBeInTheDocument()
        expect(screen.getByText('close')).toBeInTheDocument()
        expect(screen.queryByText('* are Required')).not.toBeInTheDocument()
    })

    test('should close popup', async() => {
        render(<AssociatedEpicsPopup onSelectEpic = {jest.fn()} targetId = {0}/>)
        fireEvent.click(await screen.findByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})