import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { DraggableDeliverableList } from './index'

describe('<DraggableDeliverableList />', () => {

    const commonProps = {
        capabilityId: 1,
        onUpdate: jest.fn,
        onDelete: jest.fn,
        onClick: jest.fn
    }

    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')

    beforeEach(() => {
        selectDeliverablesByCapabilityIdMock.mockReturnValue([])
    })

    test('should render no deliverables text', () => {
        render(<DraggableDeliverableList {...commonProps}/>)

        expect(screen.getByText('No Deliverables added yet.')).toBeInTheDocument()
    })

    test('should not render no deliverables text', () => {
        render(<DraggableDeliverableList {...commonProps} hasEdit/>)

        expect(screen.queryByText('No Deliverables added yet.')).not.toBeInTheDocument()
    })

})