import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { DeliverablesContainer } from './index'

describe('<DeliverablesContainer />', () => {

    const selectDeliverablesByCapabilityIdMock = useModuleMock(
        'Redux/Deliverables/selectors',
        'selectDeliverablesByCapabilityId'
    )

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
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
        render(<DeliverablesContainer capabilityId = {2}/>)
        expect(screen.getByText('Deliverable')).toBeInTheDocument()
    })

    // test('should call dispatch to create deliverable', () => {
    //     useDispatchMock().mockResolvedValue({ type: '' })

    //     render(<DeliverablesContainer capabilityId = {2}/>)

    //     act(() => {
    //         userEvent.type(screen.getByText('Deliverable'), 'DeliverableUpdate{enter}')
    //     })

    //     // waitForElementToBeRemoved(screen.getByTestId('DeliverablesContainer__loading'))

    //     expect(requestUpdateDeliverableMock).toHaveBeenCalledTimes(0)
    // })

})