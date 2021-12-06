import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { GoalContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>GoalCard</div>) }))

describe('<GoalContainer />', () => {

    const selectMeasureIdsByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureIdsByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasureIdsByAssertionIdMock.mockReturnValue([1])
    })

    test('should render', () => {
        render(<GoalContainer assertionId = {2} hasEdit = {false}/>)

        expect(screen.getByText('GoalCard')).toBeInTheDocument()
    })

    test('should call dispatch to create goal', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<GoalContainer assertionId = {2} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('GoalContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('GoalContainer__loading'))

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})