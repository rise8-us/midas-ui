import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { DeliverableEntry } from './index'

describe('<DeliverableEntry>', () => {

    const setCapabilityPageMock = useModuleMock('Redux/AppSettings/reducer', 'setCapabilityPage')
    const selectCapabilityPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectCapabilityPageSettings')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')

    const defaultProps = {
        id: 1,
        title: 'title',
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render', () => {
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: 1 })
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)

        render(<DeliverableEntry {...defaultProps} />)

        fireEvent.mouseEnter(screen.getByTestId('DeliverableEntry__wrap'))
        fireEvent.mouseLeave(screen.getByTestId('DeliverableEntry__wrap'))
        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByTestId('DeliverableEntry__empty-div')).toBeInTheDocument()
    })

    test('should update selectedDeliverableId', () => {
        useDispatchMock().mockReturnValue({})
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: null })
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)

        render(<DeliverableEntry {...defaultProps}/>)

        fireEvent.click(screen.getByTestId('DeliverableEntry__wrap'))

        expect(setCapabilityPageMock).toHaveBeenCalledWith({ selectedDeliverableId: 1 })
    })

})