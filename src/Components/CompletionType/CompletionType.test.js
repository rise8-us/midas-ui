import React from 'react'
import {
    act, mockSearchEpicsComponent, renderWithRouter, screen, selectCompletionTypesMock, userEvent
} from 'Utilities/test-utils'
import { determineCompletionTypeData } from './CompletionType'
import { CompletionType } from './index'

jest.mock('Components/Search/SearchEpics/SearchEpics', () => function testing({ onChange, textFieldProps }) {
    return mockSearchEpicsComponent({ onChange, placeholder: textFieldProps?.placeholder })
})

describe('<CompletionType />', () => {
    jest.setTimeout(40000)

    const testMock = jest.fn()

    const completion = { target: 1, value: 0 }
    const requiredProps = {
        onChange: jest.fn,
        completion,
    }

    beforeEach(() => {
        selectCompletionTypesMock()
        testMock.mockReset()
    })

    test('should render with unknown completionType', () => {
        renderWithRouter(<CompletionType {...requiredProps}/>)

        expect(screen.getByLabelText('Completion Type')).toBeInTheDocument()
        expect(screen.queryByLabelText('Value')).not.toBeInTheDocument()
        expect(screen.queryByLabelText('Target')).not.toBeInTheDocument()
    })

    describe('manual options', () => {
        test('should handle empty values onChange', () => {
            jest.useFakeTimers()

            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        value: 2,
                        target: 13,
                        completionType: 'NUMBER'
                    }}
                />
            )

            userEvent.clear(screen.getByDisplayValue('2'))

            act(() => {
                jest.runAllTimers()
            })

            expect(screen.getByDisplayValue('')).toBeInTheDocument()
            expect(testMock).toHaveBeenCalledWith({ value: 0 })
        })

        test('should call onChange for manual value field', () => {
            jest.useFakeTimers()

            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        target: 13,
                        completionType: 'NUMBER'
                    }}
                />
            )

            userEvent.type(screen.getByDisplayValue('0'), '{backspace}12')

            act(() => {
                jest.runAllTimers()
            })

            expect(screen.getByDisplayValue('12')).toBeInTheDocument()
            expect(testMock).toHaveBeenCalledWith({ value: 12 })
        })

        test('should call onChange for target field', () => {
            jest.useFakeTimers()

            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        completionType: 'NUMBER'
                    }}
                />
            )

            userEvent.type(screen.getByDisplayValue('1'), '2')

            act(() => {
                jest.runAllTimers()
            })

            expect(screen.getByDisplayValue('12')).toBeInTheDocument()
            expect(testMock).toHaveBeenCalledWith({ target: 12 })
        })

        test('should handle onchange for binary completion type', () => {
            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        value: 1,
                        completionType: 'BINARY'
                    }}
                />
            )

            userEvent.click(screen.getByText('Complete'))

            expect(testMock).toHaveBeenCalledWith({ value: 0 })
        })

        test('should handle onchange for binary completion type', () => {
            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        completionType: 'BINARY'
                    }}
                />
            )

            userEvent.click(screen.getByText('Complete'))

            expect(testMock).toHaveBeenCalledWith({ value: 1 })
        })

        test('should handle onChange for completionType', () => {
            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        completionType: 'NUMBER'
                    }}
                />
            )

            userEvent.click(screen.getByTestId('ArrowDropDownIcon'))
            userEvent.click(screen.getByText('Binary'))

            expect(testMock).toHaveBeenCalledWith({
                gitlabEpicId: null,
                gitlabIssueId: null,
                completionType: 'BINARY',
                target: 1,
                value: 0
            })
        })
    })

    describe('automated options', () => {
        test('gitlab epic - not selected calls update', () => {
            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        value: 2,
                        target: 13,
                        completionType: 'GITLAB_EPIC'
                    }}
                />
            )

            userEvent.type(screen.getByPlaceholderText('Search product epics by title'), 'A')

            expect(testMock).toHaveBeenCalledWith({
                completionType: 'GITLAB_EPIC',
                gitlabEpicId: 20
            })
        })
        test('gitlab epic - should render with option', () => {
            renderWithRouter(
                <CompletionType
                    {...requiredProps}
                    onChange = {testMock}
                    hasEdit
                    completion = {{
                        ...completion,
                        value: 2,
                        target: 13,
                        completionType: 'GITLAB_EPIC',
                        gitlabEpic: {
                            title: 'A cool linked epic'
                        }
                    }}
                />
            )

            expect(screen.getByPlaceholderText('A cool linked epic')).toBeInTheDocument()
        })
    })

    describe('should render each completionType', () => {
        test('BINARY', () => {
            renderWithRouter(
                <CompletionType {...requiredProps} completion = {{ ...completion, completionType: 'BINARY' }}/>
            )

            expect(screen.getByText('Complete')).toBeInTheDocument()
            expect(screen.getByDisplayValue('Binary')).toBeInTheDocument()
        })

        test('PERCENTAGE', () => {
            renderWithRouter(
                <CompletionType {...requiredProps} completion = {{ ...completion, completionType: 'PERCENTAGE' }}/>
            )

            expect(screen.getByDisplayValue('Percentage')).toBeInTheDocument()
            expect(screen.getAllByText('Value (%)')).toHaveLength(2)
        })

        test('NUMBER', () => {
            renderWithRouter(
                <CompletionType {...requiredProps} completion = {{ ...completion, completionType: 'NUMBER' }}/>
            )

            expect(screen.getByDisplayValue('Number')).toBeInTheDocument()
            expect(screen.getAllByText('Value')).toHaveLength(2)
            expect(screen.getAllByText('Target')).toHaveLength(2)
        })

        test('MONEY', () => {
            renderWithRouter(
                <CompletionType {...requiredProps} completion = {{ ...completion, completionType: 'MONEY' }}/>
            )

            expect(screen.getByDisplayValue('Money')).toBeInTheDocument()
            expect(screen.getAllByText('Value')).toHaveLength(2)
            expect(screen.getAllByText('Target')).toHaveLength(2)
            expect(screen.getAllByTestId('AttachMoneyIcon')).toHaveLength(2)
        })
    })

    describe('determineCompletionTypeData', () => {
        const onChangeTypeMock = jest.fn()

        const noSyncFields = {
            gitlabEpicId: null,
            gitlabIssueId: null
        }

        afterEach(() => {
            onChangeTypeMock.mockClear()
        })

        test('should update type to binary and change value to 1', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'BINARY', value: 1, target: 1 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'BINARY',
                value: 1,
                target: 1
            })
        })

        test('should handle value > target for percentage', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'PERCENTAGE', value: 101, target: 10 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'PERCENTAGE',
                value: 100,
                target: 100
            })
        })

        test('should calculate correct percentage of value ', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'PERCENTAGE', value: 551, target: 1000 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'PERCENTAGE',
                value: 55.1,
                target: 100
            })
        })

        test('should update type to number', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'NUMBER', value: 0, target: 100 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'NUMBER',
                value: 0,
                target: 100
            })
        })

        test('should update type to money', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'MONEY', value: 0, target: 100 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'MONEY',
                value: 0,
                target: 100
            })
        })

        test('should update type to gitlab issue', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'GITLAB_ISSUE', gitlabIssueId: 10 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'GITLAB_ISSUE',
                gitlabIssueId: 10
            })
        })

        test('should update type to gitlab epic', () => {
            determineCompletionTypeData(onChangeTypeMock, { completionType: 'GITLAB_EPIC', gitlabEpicId: 10 })
            expect(onChangeTypeMock).toHaveBeenCalledWith({
                ...noSyncFields,
                completionType: 'GITLAB_EPIC',
                gitlabEpicId: 10
            })
        })
    })
})