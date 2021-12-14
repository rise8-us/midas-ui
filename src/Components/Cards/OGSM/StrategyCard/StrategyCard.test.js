import React from 'react'
import {
    fireEvent, render, screen, selectAssertionStatusesMock, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { StrategyCard } from './index'

describe('<StrategyCard />', () => {
    const strategy = {
        id: 1,
        text: 'Text',
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
    const requestSearchCommentsMock = useModuleMock('Redux/Comments/actions', 'requestSearchComments')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectAssertionByIdMock.mockReturnValue(strategy)
        selectAssertionStatusesMock()
    })

    test('should render', () => {
        selectAssertionByIdMock.mockReturnValue({ ...strategy, status: null })

        render(<StrategyCard id = {strategy.id} hasEdit = {false} />)

        expect(screen.getByDisplayValue('Text')).toBeInTheDocument()
        expect(screen.getByDisplayValue('01/01/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('03/03/2020')).toBeInTheDocument()
        expect(screen.getByDisplayValue('02/02/2020 03:22 pm')).toBeInTheDocument()
    })

    test('should call dispatch to request update assertion text', () => {
        render(<StrategyCard id = {strategy.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text Edit{Enter}')
        expect(requestUpdateAssertionMock).toHaveBeenCalledWith({
            ...strategy,
            text: 'Text Edit',
            children: []
        })
    })

    test('should not call dispatch to request update assertion text if no change', () => {
        render(<StrategyCard id = {strategy.id} hasEdit = {true} />)

        userEvent.type(screen.getByDisplayValue('Text'), 'Text{Enter}')
        expect(requestUpdateAssertionMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request delete assertion', () => {
        render(<StrategyCard id = {strategy.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('confirm'))
        expect(requestDeleteAssertionMock).toHaveBeenCalledWith(1)
    })

    test('should cancel delete assertion popup', () => {
        render(<StrategyCard id = {strategy.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('delete'))
        fireEvent.click(screen.getByText('cancel'))
        expect(requestDeleteAssertionMock).not.toHaveBeenCalled()
    })

    test('should open comments', () => {
        render(<StrategyCard id = {strategy.id} hasEdit = {true} />)

        fireEvent.click(screen.getByTitle('comment'))
        expect(requestSearchCommentsMock).toHaveBeenCalledTimes(1)
    })

})