import React from 'react'
import {
    fireEvent, render, screen, selectAssertionStatusesMock, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { ObjectiveCard } from './index'

describe('<ObjectiveCard />', () => {
    const objective = {
        id: 1,
        text: 'Git er done',
        startDate: '2020-01-01',
        dueDate: '2020-03-03',
        completedAt: '2020-02-02T15:22:00',
        isArchived: false,
        status: 'COMPLETED',
        productId: 2,
        parent: null,
        children: [],
        comments: []
    }

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const requestUpdateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestUpdateAssertion')
    const requestDeleteAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestDeleteAssertion')
    const requestArchiveAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestArchiveAssertion')
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAssertionByIdMock.mockReturnValue(objective)
        selectAssertionStatusesMock()
    })

    test('should render', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {false} />)

        expect(screen.getByDisplayValue('Git er done')).toBeInTheDocument()
        expect(screen.getByDisplayValue('01/01/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('03/03/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('02/02/2020 03:22 pm')).toBeInTheDocument()
    })

    test('should call dispatch to request assertion text update', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Git er done'), 'Git er done Edit{Enter}')
        expect(requestUpdateAssertionMock).toHaveBeenCalledWith({
            ...objective,
            text: 'Git er done Edit',
            children: []
        })
    })

    test('should not call dispatch to request assertion text update if no change', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Git er done'), 'Git er done{Enter}')
        expect(requestUpdateAssertionMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request assertion deletion', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))
        expect(requestDeleteAssertionMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete assertion popup', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))
        expect(requestDeleteAssertionMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request archive assertion', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('archive'))
        expect(requestArchiveAssertionMock).toHaveBeenCalledTimes(1)
    })

    test('should open comments', () => {
        render(<ObjectiveCard id = {objective.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('comment'))
        expect(requestSearchCommentsMock).toHaveBeenCalledTimes(1)
    })

})