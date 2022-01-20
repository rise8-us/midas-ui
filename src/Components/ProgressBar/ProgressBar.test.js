import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProgressBar } from './index'

describe('<ProgressBar />', () => {

    const getNumberOrZeroMock = useModuleMock('Utilities/getNumberOrZero', 'getNumberOrZero')
    const getTodayAsPercentageInRangeMock = useModuleMock('Utilities/dateHelpers', 'getTodayAsPercentageInRange')

    const defaultProps = {
        showPercent: true,
        overlayDate: {
            start: '2020-01-02',
            end: '2020-01-31',
            show: true
        }
    }

    test('should render', () => {
        getNumberOrZeroMock.mockReturnValue(10)
        getTodayAsPercentageInRangeMock(20)

        render(<ProgressBar {...defaultProps} hasEdit = {false} target = {100} value = {10}/>)

        expect(screen.getByTestId('HikingOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByText('10% Complete')).toBeInTheDocument()
        expect(screen.getByText('(10 / 100)')).toBeInTheDocument()
    })

})