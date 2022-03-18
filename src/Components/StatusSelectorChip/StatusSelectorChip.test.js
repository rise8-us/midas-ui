import {
    fireEvent, render, screen, selectAssertionStatusesMock, useDispatchMock, useModuleMock
} from 'Utilities/test-utils'
import { StatusSelectorChip } from './index'

describe('<StatusSelectorChip />', () => {

    const assertion = { 'id': 1, 'status': 'NOT_STARTED' }

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        selectAssertionStatusesMock()
        selectAssertionByIdMock.mockReturnValue(assertion)
    })

    test('should render', () => {
        render(
            <StatusSelectorChip
                statusName = {assertion.status}
                onEditProps = {{ assertionId: assertion.id }}
            />
        )

        expect(screen.getByText('Not Started')).toBeInTheDocument()
        expect(screen.queryByTestId('StatusSelectorChip__pencil')).not.toBeInTheDocument()
    })

    test('should open update status popup', () => {
        useDispatchMock().mockResolvedValue()
        render(
            <StatusSelectorChip
                statusName = {assertion.status}
                onEditProps = {{ assertionId: assertion.id }}
                hasEdit = {true}
            />
        )
        expect(screen.getByTestId('StatusSelectorChip__pencil')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Not Started'))

        expect(openPopupMock).toHaveBeenCalledTimes(1)
    })
})