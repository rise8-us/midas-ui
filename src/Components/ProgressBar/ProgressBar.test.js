import React from 'react'
import { render, screen, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProgressBar } from './index'

describe('<ProgressBar />', () => {

    const getNumberOrZeroMock = useModuleMock('Utilities/getNumberOrZero', 'getNumberOrZero')
    const getTodayAsPercentageInRangeMock = useModuleMock('Utilities/dateHelpers', 'getTodayAsPercentageInRange')

    const defaultProps = {
        hasEdit: true,
        value: 0,
        target: 2,
        showPercent: true,
        onSaveValue: jest.fn,
        onSaveTarget: jest.fn,
        overlayDate: {
            start: '2020-01-02',
            end: '2020-01-31',
            show: true
        }
    }

    beforeEach(() => {
        getNumberOrZeroMock.mockReturnValue(10)
        getTodayAsPercentageInRangeMock(20)
    })

    test('should render', () => {
        render(<ProgressBar {...defaultProps} hasEdit = {false}/>)

        expect(screen.getByTestId('HikingOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByText('10% Complete')).toBeInTheDocument()
    })

    test('should call value & target onSave callbacks', () => {
        const onSaveValueMock = jest.fn()
        const onSaveTargetMock = jest.fn()

        render(
            <ProgressBar
                {...defaultProps}
                hasHover
                onSaveTarget = {onSaveTargetMock}
                onSaveValue = {onSaveValueMock}
            />
        )

        userEvent.type(screen.getByDisplayValue('0'), '4')
        userEvent.type(screen.getByDisplayValue('2'), '8')
        userEvent.tab()

        expect(screen.getByTestId('FlagOutlinedIcon')).toBeInTheDocument()
        expect(screen.getByTestId('SportsScoreOutlinedIcon')).toBeInTheDocument()
        expect(onSaveValueMock).toHaveBeenCalledWith('4')
        expect(onSaveTargetMock).toHaveBeenCalledWith('8')
    })

})