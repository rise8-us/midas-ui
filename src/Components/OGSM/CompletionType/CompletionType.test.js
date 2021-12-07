import React from 'react'
import { act, render, screen, selectCompletionTypesMock, userEvent } from 'Utilities/test-utils'
import { determineCompletionTypeData } from './CompletionType'
import { CompletionType } from './index'

describe('<CompletionType />', () => {
    jest.setTimeout(40000)

    const requiredProps = {
        onChangeType: jest.fn,
        onSaveTarget: jest.fn,
        onSaveValue: jest.fn,
        target: 1,
        value: 0
    }

    beforeEach(() => {
        selectCompletionTypesMock()
    })

    test('should render with unknown completionType', () => {
        render(<CompletionType {...requiredProps} completionType = 'undefined'/>)

        expect(screen.getByLabelText('Completion Type')).toBeInTheDocument()
        expect(screen.queryByLabelText('Value')).not.toBeInTheDocument()
        expect(screen.queryByLabelText('Target')).not.toBeInTheDocument()
    })

    test('should render completionTypes', () => {
        const { rerender } = render(<CompletionType {...requiredProps} />)

        expect(screen.getByText('Complete')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Binary')).toBeInTheDocument()

        rerender(<CompletionType {...requiredProps} completionType = 'PERCENTAGE'/>)
        expect(screen.getByDisplayValue('Percentage')).toBeInTheDocument()
        expect(screen.getByLabelText('Value (%)')).toBeInTheDocument()

        rerender(<CompletionType {...requiredProps} completionType = 'NUMBER'/>)
        expect(screen.getByDisplayValue('Number')).toBeInTheDocument()
        expect(screen.getByLabelText('Value')).toBeInTheDocument()
        expect(screen.getByLabelText('Target')).toBeInTheDocument()

        rerender(<CompletionType {...requiredProps} completionType = 'MONEY'/>)
        expect(screen.getByDisplayValue('Money')).toBeInTheDocument()
        expect(screen.getByLabelText('Value')).toBeInTheDocument()
        expect(screen.getByLabelText('Target')).toBeInTheDocument()
        expect(screen.getAllByTestId('AttachMoneyIcon')).toHaveLength(2)
    })

    test('should call onSaveValue onChange', () => {
        const onSaveValueMock = jest.fn()
        jest.useFakeTimers()

        render(
            <CompletionType
                {...requiredProps}
                completionType = 'NUMBER'
                onSaveValue = {onSaveValueMock}
                hasEdit
            />
        )

        userEvent.type(screen.getByDisplayValue(0), '1')

        act(() => {
            jest.runAllTimers()
        })

        expect(screen.getByDisplayValue('01')).toBeInTheDocument()
        expect(onSaveValueMock).toHaveBeenCalledWith('01')
    })

    test('should call onSaveTarget onChange', () => {
        const onSaveTargetMock = jest.fn()
        jest.useFakeTimers()

        render(
            <CompletionType
                {...requiredProps}
                completionType = 'NUMBER'
                onSaveTarget = {onSaveTargetMock}
                hasEdit
            />
        )

        userEvent.type(screen.getByDisplayValue(1), '2')

        act(() => {
            jest.runAllTimers()
        })

        expect(screen.getByDisplayValue('12')).toBeInTheDocument()
        expect(onSaveTargetMock).toHaveBeenCalledWith('12')
    })

    test('should handle onchange for binary completion type', () => {
        const onSaveValueMock = jest.fn()

        render(
            <CompletionType
                {...requiredProps}
                completionType = 'BINARY'
                value = {1}
                onSaveValue = {onSaveValueMock}
                hasEdit
            />
        )

        userEvent.click(screen.getByText('Complete'))

        expect(onSaveValueMock).toHaveBeenCalledWith(0)
    })

    test('should handle onchange for binary completion type', () => {
        const onSaveValueMock = jest.fn()

        render(
            <CompletionType
                {...requiredProps}
                completionType = 'BINARY'
                onSaveValue = {onSaveValueMock}
                hasEdit
            />
        )

        userEvent.click(screen.getByText('Complete'))

        expect(onSaveValueMock).toHaveBeenCalledWith(1)
    })

    test('should throw error when type change isnt selected', () => {
        render(<CompletionType {...requiredProps} completionType = 'NUMBER' hasEdit/>)

        userEvent.click(screen.getByTestId('CloseIcon'))

        expect(screen.getByText('Cannot be empty!'))
    })

    test('should handle onChangeType', () => {
        const onSaveTypeMock = jest.fn()

        render(<CompletionType {...requiredProps} completionType = 'NUMBER' onChangeType = {onSaveTypeMock} hasEdit/>)

        userEvent.click(screen.getByTestId('ArrowDropDownIcon'))
        userEvent.click(screen.getByText('Binary'))

        expect(onSaveTypeMock).toHaveBeenCalledWith({ 'completionType': 'BINARY', 'target': 1, 'value': 0 })
    })

    describe('determineCompletionTypeData', () => {
        const onChangeTypeMock = jest.fn()

        afterEach(() => {
            onChangeTypeMock.mockClear()
        })

        test('should update type to binary and change value to 1', () => {
            determineCompletionTypeData('BINARY', onChangeTypeMock, 1, 1)
            expect(onChangeTypeMock).toHaveBeenCalledWith({ completionType: 'BINARY', value: 1, target: 1 })
        })

        test('should handle value > target for percentage', () => {
            determineCompletionTypeData('PERCENTAGE', onChangeTypeMock, 101, 10)
            expect(onChangeTypeMock).toHaveBeenCalledWith({ completionType: 'PERCENTAGE', value: 100, target: 100 })
        })

        test('should calculate correct percentage of value ', () => {
            determineCompletionTypeData('PERCENTAGE', onChangeTypeMock, 551, 1000)
            expect(onChangeTypeMock).toHaveBeenCalledWith({ completionType: 'PERCENTAGE', value: 55.1, target: 100 })
        })

        test('should update type to number', () => {
            determineCompletionTypeData('NUMBER', onChangeTypeMock, 0, 100)
            expect(onChangeTypeMock).toHaveBeenCalledWith({ completionType: 'NUMBER', value: 0, target: 100 })
        })

        test('should update type to money', () => {
            determineCompletionTypeData('MONEY', onChangeTypeMock, 0, 100)
            expect(onChangeTypeMock).toHaveBeenCalledWith({ completionType: 'MONEY', value: 0, target: 100 })
        })
    })
})