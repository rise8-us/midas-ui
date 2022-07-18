import {
    fireEvent, render,
    screen, useDispatchMock, useModuleMock
} from 'Utilities/test-utils'
import { AssociateDeliverableEpicsPopup } from '.'

jest.mock('Components/Search/SearchEpicsDropdown/SearchEpicsDropdown', () => function testing() {
    return <div>SearchEpicsDropdown</div>
})

describe('<AssociateDeliverableEpicsPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const selectDeliverableByParentIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableByParentId')

    beforeEach(() => {
        useDispatchMock()
        selectDeliverableByParentIdMock.mockReturnValue([{
            title: 'epic title',
            productId: 1,
            id: 2,
            completion: {
                value: 2,
                target: 10,
                gitlabEpic: {
                    id: 20
                }
            }
        }])
    })

    test('should render properly', async() => {
        render(<AssociateDeliverableEpicsPopup
            deliverableId = {0}
            portfolioId = {1}
            onSelectEpic = {jest.fn()}
            onDeselectEpic = {jest.fn()}
        />)

        expect(await screen.findByText('Associate Epics')).toBeInTheDocument()
        expect(screen.getByText('close')).toBeInTheDocument()
        expect(screen.queryByText('* are Required')).not.toBeInTheDocument()
    })

    test('should close popup', async() => {
        render(<AssociateDeliverableEpicsPopup
            deliverableId = {0}
            portfolioId = {1}
            onSelectEpic = {jest.fn()}
            onDeselectEpic = {jest.fn()}
        />)

        fireEvent.click(await screen.findByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})