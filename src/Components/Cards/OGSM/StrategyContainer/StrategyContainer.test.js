import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { StrategyContainer } from './index'

jest.mock('Components/Cards/OGSM/StrategyCard/StrategyCard',
    () => (function testing() { return (<div>StrategyCard</div>) }))


describe('<StrategyContainer />', () => {

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const selectChildIdsByParentIdMock = useModuleMock('Redux/Assertions/selectors', 'selectChildIdsByParentId')
    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectAssertionByIdMock.mockReturnValue({ id: 1 })
        selectChildIdsByParentIdMock.mockReturnValue([{ id: 10 }, { id: 20 }])
    })

    test('should render', () => {
        render(<StrategyContainer productId = {23} parentId = {1} hasEdit = {false}/>)

        expect(screen.getAllByText('StrategyCard')).toHaveLength(2)
    })

    test('should call dispatch to create strategy', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<StrategyContainer productId = {23} parentId = {1} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('StrategyContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('StrategyContainer__loading'))

        expect(requestCreateAssertionMock).toHaveBeenCalledWith({
            parentId: 1,
            productId: 23,
            text: 'Enter new strategy here...',
            status: 'NOT_STARTED',
            children: [],
            measures: [{
                value: 0,
                target: 1,
                text: 'Enter new measure here...',
                completionType: 'BINARY'
            }]
        })
    })

})