import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { GoalContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>GoalCard</div>) }))

describe('<MeasureContainer />', () => {

    const selectMeasuresByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasuresByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasuresByAssertionIdMock.mockReturnValue([{ id: 1 }])
    })

    test('should render', () => {
        render(<GoalContainer id = {1} hasEdit/>)

        expect(screen.getByText('GoalCard')).toBeInTheDocument()
    })

    test('should call dispatch to create goal', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<GoalContainer id = {1} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('GoalContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('GoalContainer__loading'))

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})