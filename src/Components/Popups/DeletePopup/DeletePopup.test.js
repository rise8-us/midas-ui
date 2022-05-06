import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { DeletePopup } from './index'

describe('<DeletePopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const mockRequest = jest.fn()

    const mockItemToDelete = {
        id: 4,
        title: 'TargetToDelete',
        type: 'target',
        constant: 'constant'
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render properly', () => {
        render(<DeletePopup
            id = {mockItemToDelete.id}
            title = {mockItemToDelete.title}
            type = {mockItemToDelete.type}
            constant = {mockItemToDelete.constant}
            request = {mockRequest}
        />)

        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('Please confirm or cancel')).toBeInTheDocument()
        expect(screen.getByText('TargetToDelete')).toBeInTheDocument()
    })

    test('should call onSubmit', () => {
        render(<DeletePopup
            id = {mockItemToDelete.id}
            title = {mockItemToDelete.title}
            type = {mockItemToDelete.type}
            constant = {mockItemToDelete.constant}
            request = {mockRequest}
        />)

        fireEvent.click(screen.getByTestId('Popup__button-submit'))
        expect(mockRequest).toHaveBeenCalled()
    })

    test('should close popup', () => {
        render(<DeletePopup
            id = {mockItemToDelete.id}
            title = {mockItemToDelete.title}
            type = {mockItemToDelete.type}
            constant = {mockItemToDelete.constant}
            request = {mockRequest}
        />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})