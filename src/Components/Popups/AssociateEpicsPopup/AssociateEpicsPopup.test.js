import {
    fireEvent, render,
    screen, useDispatchMock, useModuleMock
} from 'Utilities/test-utils'
import { AssociateEpicsPopup } from './index'

jest.mock('Components/Search/SearchEpicsDropdown/SearchEpicsDropdown', () => function testing() {
    return <div>SearchEpicsDropdown</div>
})

describe('<AssociateEpicsPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    beforeEach(() => {
        useDispatchMock()
    })

    test('should render properly', async() => {
        render(<AssociateEpicsPopup onSelectEpic = {jest.fn()} targetId = {0}/>)

        expect(await screen.findByText('Associate Epics')).toBeInTheDocument()
        screen.getByText('close')
        screen.getByText('submit')
        expect(screen.queryByText('* are Required')).not.toBeInTheDocument()
    })

    test('should close popup', async() => {
        render(<AssociateEpicsPopup onSelectEpic = {jest.fn()} targetId = {0}/>)
        fireEvent.click(await screen.findByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should call prop function on submit', async() => {
        const onSubmitMock = jest.fn()
        render(<AssociateEpicsPopup onSelectEpic = {onSubmitMock} targetId = {0}/>)
        fireEvent.click(await screen.findByTestId('Popup__button-submit'))

        expect(onSubmitMock).toHaveBeenCalled()
    })

})
