import { act, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DeliverablesContainer } from './index'

describe('<DeliverablesContainer />', () => {

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectDeliverablesByCapabilityIdMock =
        useModuleMock('Redux/Deliverables/selectors', 'selectDeliverablesByCapabilityId')
    const requestCreateDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestCreateDeliverable')
    const requestUpdateDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestUpdateDeliverable')
    const requestDeleteDeliverableMock =
        useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    const defaultProps = { capabilityId: 2,  portfolioId: 1 }

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        selectDeliverablesByCapabilityIdMock.mockReturnValue([
            {
                assignedToId: null,
                capabilityId: 2,
                children: [],
                creationDate: '2022-01-19T13:39:01',
                epicId: null,
                id: 5,
                index: 0,
                isArchived: false,
                parentId: null,
                performanceMeasureId: null,
                productId: null,
                referenceId: 0,
                releaseIds: [],
                status: 'NOT_STARTED',
                title: 'Deliverable'
            }
        ])
    })

    test('should render', () => {
        render(<DeliverablesContainer {...defaultProps}/>)
        expect(screen.getByDisplayValue('Deliverable')).toBeInTheDocument()
        selectPortfolioPagePermissionMock.mockReturnValue({ })
    })

    test('should call dispatch to create deliverable', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer {...defaultProps}/>)

        userEvent.type(screen.getByPlaceholderText('Add new deliverable...'), 'DeliverableCreate{enter}')

        expect(requestCreateDeliverableMock).toHaveBeenCalledTimes(1)
    })

    test('should call dispatch to update deliverable', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer {...defaultProps}/>)

        act(() => {
            userEvent.type(screen.getByText('Deliverable'), 'DeliverableCreate{enter}')
        })

        expect(requestUpdateDeliverableMock).toHaveBeenCalledTimes(1)
    })

    test('should call dispatch to delete deliverable', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<DeliverablesContainer {...defaultProps}/>)

        act(() => {
            userEvent.click(screen.getByText('Deliverable'))
        })
        userEvent.click(screen.getByTestId('DraggableRow__button-delete'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledTimes(1)
    })

})