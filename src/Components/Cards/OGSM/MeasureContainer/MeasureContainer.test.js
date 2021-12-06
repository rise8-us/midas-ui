import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { MeasureContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>MeasureCard</div>) }))

describe('<MeasureContainer />', () => {

    const selectMeasureIdsByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureIdsByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasureIdsByAssertionIdMock.mockReturnValue([1])
    })

    test('should render', () => {
        render(<MeasureContainer assertionId = {2} hasEdit = {false}/>)

        expect(screen.getByText('MeasureCard')).toBeInTheDocument()
    })

    test('should call dispatch to create measure', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<MeasureContainer assertionId = {2} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('MeasureContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('MeasureContainer__loading'))

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})