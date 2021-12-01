import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { MeasureContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>MeasureCard</div>) }))

describe('<MeasureContainer />', () => {

    const selectMeasuresByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasuresByAssertionId')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasuresByAssertionIdMock.mockReturnValue([{ id: 1 }])
    })

    test('should render', () => {
        render(<MeasureContainer id = {1} hasEdit/>)

        expect(screen.getByText('MeasureCard')).toBeInTheDocument()
    })
})