import React from 'react'
import { act, renderWithRouter, screen, selectCompletionTypesMock, userEvent } from 'Utilities/test-utils'
import { determineCompletionTypeData } from './CompletionType'
import { CompletionType } from './index'

describe('<CompletionType />', () => {
    jest.setTimeout(40000)

    const testMock = jest.fn()

    const requiredProps = {
        onChangeType: jest.fn,
        onSaveTarget: jest.fn,
        onSaveValue: jest.fn,
        target: 1,
        value: 0
    }

    beforeEach(() => {
        selectCompletionTypesMock()
        testMock.mockReset()
    })

    test('should render with unknown completionType', () => {
        renderWithRouter(<CompletionType {...requiredProps} completionType = 'undefined'/>)

        expect(screen.getByLabelText('Completion Type')).toBeInTheDocument()
        expect(screen.queryByLabelText('Value')).not.toBeInTheDocument()
        expect(screen.queryByLabelText('Target')).not.toBeInTheDocument()
    })

    describe('should render each completionType', () => {
        test('default to binary', () => {
            renderWithRouter(<CompletionType {...requiredProps}/>)

            expect(screen.getByText('Complete')).toBeInTheDocument()
            expect(screen.getByDisplayValue('Binary')).toBeInTheDocument()
        })

        test('PERCENTAGE', () => {
            renderWithRouter(<CompletionType {...requiredProps} completionType = 'PERCENTAGE'/>)

            expect(screen.getByDisplayValue('Percentage')).toBeInTheDocument()
            expect(screen.getAllByText('Value (%)')).toHaveLength(2)
        })

        test('NUMBER', () => {
            renderWithRouter(<CompletionType {...requiredProps} completionType = 'NUMBER'/>)

            expect(screen.getByDisplayValue('Number')).toBeInTheDocument()
            expect(screen.getAllByText('Value')).toHaveLength(2)
            expect(screen.getAllByText('Target')).toHaveLength(2)
        })

        test('MONEY', () => {
            renderWithRouter(<CompletionType {...requiredProps} completionType = 'MONEY'/>)

            expect(screen.getByDisplayValue('Money')).toBeInTheDocument()
            expect(screen.getAllByText('Value')).toHaveLength(2)
            expect(screen.getAllByText('Target')).toHaveLength(2)
            expect(screen.getAllByTestId('AttachMoneyIcon')).toHaveLength(2)
        })
    })

    test('should handle empty values onChange', () => {
        jest.useFakeTimers()

        renderWithRouter(
            <CompletionType
                {...requiredProps}
                target = {13}
                completionType = 'NUMBER'
                onSaveValue = {testMock}
                hasEdit
            />
        )

        userEvent.clear(screen.getByDisplayValue('0'))

        act(() => {
            jest.runAllTimers()
        })

        expect(screen.getByDisplayValue('')).toBeInTheDocument()
        expect(testMock).toHaveBeenCalledWith(0)
    })

    test('should call onSaveValue onChange', () => {
        jest.useFakeTimers()

        renderWithRouter(
            <CompletionType
                {...requiredProps}
                target = {13}
                completionType = 'NUMBER'
                onSaveValue = {testMock}
                hasEdit
            />
        )

        userEvent.type(screen.getByDisplayValue('0'), '{backspace}12')

        act(() => {
            jest.runAllTimers()
        })

        expect(screen.getByDisplayValue('12')).toBeInTheDocument()
        expect(testMock).toHaveBeenCalledWith(12)
    })

    test('should call onSaveTarget onChange', () => {
        jest.useFakeTimers()

        renderWithRouter(
            <CompletionType
                {...requiredProps}
                completionType = 'NUMBER'
                onSaveTarget = {testMock}
                hasEdit
            />
        )

        userEvent.type(screen.getByDisplayValue('1'), '2')

        act(() => {
            jest.runAllTimers()
        })

        expect(screen.getByDisplayValue('12')).toBeInTheDocument()
        expect(testMock).toHaveBeenCalledWith(12)
    })

    test('should handle onchange for binary completion type', () => {
        const onSaveValueMock = jest.fn()

        renderWithRouter(
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
        renderWithRouter(
            <CompletionType
                {...requiredProps}
                completionType = 'BINARY'
                onSaveValue = {testMock}
                hasEdit
            />
        )

        userEvent.click(screen.getByText('Complete'))

        expect(testMock).toHaveBeenCalledWith(1)
    })

    test('should throw error when type change isnt selected', () => {
        renderWithRouter(<CompletionType {...requiredProps} completionType = 'NUMBER' hasEdit/>)

        userEvent.click(screen.getByTestId('CloseIcon'))

        expect(screen.getByText('Cannot be empty!'))
    })

    test('should handle onChangeType', () => {
        renderWithRouter(
            <CompletionType {...requiredProps} completionType = 'NUMBER' onChangeType = {testMock} hasEdit/>
        )

        userEvent.click(screen.getByTestId('ArrowDropDownIcon'))
        userEvent.click(screen.getByText('Binary'))

        expect(testMock).toHaveBeenCalledWith({ 'completionType': 'BINARY', 'target': 1, 'value': 0 })
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