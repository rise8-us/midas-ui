import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { StrategyContainer } from './index'

jest.mock('Components/Cards/OGSM/StrategyCard/StrategyCard',
    () => (function testing() { return (<div>StrategyCard</div>) }))


describe('<StrategyContainer />', () => {

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const selectAssertionsByParentIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByParentId')
    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    const objective = {
        id: 1,
        productId: 23
    }

    const allStrategiesResponse = [
        {
            id: 10,
            text: 'strategy 1',
            parentId: 1
        }, {
            id: 20,
            text: 'strategy 2',
            parentId: 1
        }
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectAssertionByIdMock.mockReturnValue(objective)
        selectAssertionsByParentIdMock.mockReturnValue(allStrategiesResponse)
    })

    test('should render', () => {
        render(<StrategyContainer id = {1} hasEdit/>)

        expect(screen.getAllByText('StrategyCard')).toHaveLength(2)
    })

    test('should call dispatch to create strategy', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<StrategyContainer id = {1} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('StrategyContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('StrategyContainer__loading'))

        expect(requestCreateAssertionMock).toHaveBeenCalledTimes(1)
    })

})