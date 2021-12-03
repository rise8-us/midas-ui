import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { MeasureContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>MeasureCard</div>) }))

describe('<MeasureContainer />', () => {

    const selectMeasuresByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasuresByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasuresByAssertionIdMock.mockReturnValue([{ id: 1 }])
    })

    test('should render', () => {
        render(<MeasureContainer id = {1} hasEdit/>)

        expect(screen.getByText('MeasureCard')).toBeInTheDocument()
    })

    test('should call dispatch to create measure', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<MeasureContainer id = {1} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('MeasureContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('MeasureContainer__loading'))

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})